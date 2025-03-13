import { create } from 'zustand';

export const useBugData = create((set) => ({
    bugs: [],
    setBugs: (bugs) => set({ bugs }),
    addBug: async (newBug) => {
        if (!newBug.id || !newBug.img || !newBug.stat || !newBug.desc) {
            return { success: false, message: "Please fill in all the boxes!" };
        }

        const res = await fetch("/api/bugs", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(newBug),
        });

        const data = await res.json();
        set((state) => ({ bugs: [...state.bugs, data.data] }));

        return { success: true, message: "New Bug added successfully!" }
    },
    fetchBugs: async () => {
        const res = await fetch("/api/bugs");
        const data = await res.json();

        set({ bugs: data.data });
    },
    closeBug: async (bugid) => {
        const res = await fetch(`/api/bugs/${bugid}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        set(state => ({ bugs: state.bugs.filter(bug => bug._id !== bugid) }));

        return { success: true, message: data.message };
    },
    updateBug: async (bugid, updatedBug) => {
        const res = await fetch(`/api/bugs/${bugid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBug),
        });

        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        set(state => ({
            bugs: state.bugs.map((bug) => (bug._id === bugid ? data.data : bug)),
        }));

        return { success: true, message: data.message };
    }
}));

