export interface Project {
    // id:string
    title: string;
    description: string;
    image?: string;
    tags?: string[];
    live_url?: string;
    github_url?: string;
    features?: string[];
    technologies?: string[];
    date?: string;
    duration?: string;
    role?: string;
    category?: string;
    images?: string[];
    featured?:boolean
}