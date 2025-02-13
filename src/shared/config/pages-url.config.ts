class DASHBOARD {
    private root = "/i"

    HOME = this.root;
    TASKS = `${this.root}/tasks`
    FINANCES = `${this.root}/finances`
    SETTINGS = `${this.root}/settings`
    CALENDAR = `${this.root}/calendar`
}

export const DASHBOARD_PAGES = new DASHBOARD()