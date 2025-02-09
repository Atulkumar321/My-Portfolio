import { 
  users, projects, projectTags, messages,
  type User, type InsertUser,
  type Project, type InsertProject,
  type ProjectTag, type InsertProjectTag,
  type Message, type InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project operations
  getProjects(): Promise<(Project & { tags: string[] })[]>;
  getProject(id: number): Promise<(Project & { tags: string[] }) | undefined>;
  createProject(project: InsertProject, tags: string[]): Promise<Project>;

  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  markMessageAsRead(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Project operations
  async getProjects(): Promise<(Project & { tags: string[] })[]> {
    const result = await db.select().from(projects)
      .leftJoin(projectTags, eq(projects.id, projectTags.projectId));

    const projectMap = new Map<number, Project & { tags: string[] }>();

    result.forEach(({ projects: project, project_tags: tag }) => {
      if (!projectMap.has(project.id)) {
        projectMap.set(project.id, { ...project, tags: [] });
      }
      if (tag) {
        projectMap.get(project.id)?.tags.push(tag.tag);
      }
    });

    return Array.from(projectMap.values());
  }

  async getProject(id: number): Promise<(Project & { tags: string[] }) | undefined> {
    const result = await db.select()
      .from(projects)
      .where(eq(projects.id, id))
      .leftJoin(projectTags, eq(projects.id, projectTags.projectId));

    if (result.length === 0) return undefined;

    const project = result[0].projects;
    const tags = result.map(r => r.project_tags?.tag).filter(Boolean) as string[];

    return { ...project, tags };
  }

  async createProject(project: InsertProject, tags: string[]): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();

    if (tags.length > 0) {
      await db.insert(projectTags).values(
        tags.map(tag => ({
          projectId: newProject.id,
          tag
        }))
      );
    }

    return newProject;
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(messages.createdAt);
  }

  async markMessageAsRead(id: number): Promise<void> {
    await db.update(messages)
      .set({ read: true })
      .where(eq(messages.id, id));
  }
}

export const storage = new DatabaseStorage();