export type User = {
    Username: string,
    Email: string,
    Password: string
}

export function loadUsers(): User[] {
    const userJSON = localStorage.getItem("users");
    return userJSON ? JSON.parse(userJSON) : [];
}

export function saveUsers(users: User[]): void {
    localStorage.setItem("users", JSON.stringify(users));
}

export let users: User[] = loadUsers();