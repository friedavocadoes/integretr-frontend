// API utilities - use real backend if VITE_BACKEND is configured, otherwise fall back to mock responses
const BACKEND =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_BACKEND
    ? import.meta.env.VITE_BACKEND.replace(/\/+$/, "")
    : null;

const fetchJson = async (url, opts = {}) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const error = new Error(
      err.msg || err.message || res.statusText || "Request failed"
    );
    error.response = { data: err, status: res.status };
    throw error;
  }
  return res.json();
};

// Mock data (kept for local dev when BACKEND is not provided)
const mockNGOs = [
  {
    _id: "1",
    name: "Education for All Foundation",
    category: "Education",
    description:
      "Providing quality education to underprivileged children across rural areas.",
    location: { city: "Delhi", state: "Delhi" },
    contact: { website: "https://educationforall.org" },
    requirements: [
      {
        _id: "req1",
        title: "Math Tutor Needed",
        description:
          "Looking for volunteers to teach mathematics to children aged 8-12.",
        skills: ["Teaching", "Mathematics"],
        category: "Education",
        location: "Delhi",
        createdAt: new Date(),
      },
    ],
  },
  {
    _id: "2",
    name: "Green Earth Initiative",
    category: "Environment",
    description:
      "Working towards environmental conservation and sustainable development.",
    location: { city: "Mumbai", state: "Maharashtra" },
    contact: { website: "https://greenearth.org" },
    requirements: [
      {
        _id: "req2",
        title: "Tree Plantation Drive",
        description:
          "Join us for a community tree plantation event this weekend.",
        skills: ["Event Management", "Environmental Awareness"],
        category: "Environment",
        location: "Mumbai",
        createdAt: new Date(),
      },
    ],
  },
  {
    _id: "3",
    name: "Health Care Heroes",
    category: "Health",
    description:
      "Providing healthcare services to remote and underserved communities.",
    location: { city: "Bangalore", state: "Karnataka" },
    contact: { website: "https://healthcareheroes.org" },
    requirements: [
      {
        _id: "req3",
        title: "Medical Camp Volunteer",
        description: "Assist in organizing medical camps in rural areas.",
        skills: ["Healthcare", "Organization"],
        category: "Health",
        location: "Bangalore",
        createdAt: new Date(),
      },
    ],
  },
];

const mockUsers = {
  ngos: [
    {
      id: "1",
      name: "Education for All Foundation",
      email: "admin@educationforall.org",
      category: "Education",
    },
  ],
  volunteers: [{ id: "1", name: "John Doe", email: "john@example.com" }],
};

const mockApplications = [];

export const authAPI = {
  ngoRegister: async (data) => {
    if (BACKEND) {
      return {
        data: await fetchJson(`${BACKEND}/api/ngo/register`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      };
    }
    return Promise.resolve({
      data: {
        token: "mock-token",
        ngo: {
          id: "1",
          name: data.name,
          email: data.email,
          category: data.category,
        },
      },
    });
  },
  ngoLogin: async (data) => {
    if (BACKEND) {
      return {
        data: await fetchJson(`${BACKEND}/api/ngos/login`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      };
    }
    return Promise.resolve({
      data: {
        token: "mock-token",
        ngo:
          mockUsers.ngos.find((u) => u.email === data.email) ||
          mockUsers.ngos[0],
      },
    });
  },
  volunteerRegister: async (data) => {
    if (BACKEND) {
      return {
        data: await fetchJson(`${BACKEND}/api/volunteer/register`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      };
    }
    return Promise.resolve({
      data: {
        token: "mock-token",
        volunteer: { id: "1", name: data.name, email: data.email },
      },
    });
  },
  volunteerLogin: async (data) => {
    if (BACKEND) {
      return {
        data: await fetchJson(`${BACKEND}/api/volunteer/login`, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      };
    }
    return Promise.resolve({
      data: {
        token: "mock-token",
        volunteer:
          mockUsers.volunteers.find((u) => u.email === data.email) ||
          mockUsers.volunteers[0],
      },
    });
  },
};

export const ngoAPI = {
  search: (params) => {
    let filtered = [...mockNGOs];
    if (params.category && params.category !== "all") {
      filtered = filtered.filter((ngo) => ngo.category === params.category);
    }
    if (params.city) {
      filtered = filtered.filter((ngo) =>
        ngo.location.city.toLowerCase().includes(params.city.toLowerCase())
      );
    }
    return Promise.resolve({ data: filtered });
  },
  getDetails: (id) =>
    Promise.resolve({
      data: mockNGOs.find((ngo) => ngo._id === id),
    }),
  postRequirement: (data) =>
    Promise.resolve({
      data: { message: "Requirement posted successfully", requirement: data },
    }),
  getDashboard: () =>
    Promise.resolve({
      data: {
        ngo: mockNGOs[0],
        applications: mockApplications,
      },
    }),
  updateApplicationStatus: () =>
    Promise.resolve({
      data: { message: "Application status updated" },
    }),
};

export const volunteerAPI = {
  apply: (data) => {
    mockApplications.push({
      ngoId: data.ngoId,
      requirementId: data.requirementId,
      status: "pending",
      appliedAt: new Date(),
    });
    return Promise.resolve({
      data: { message: "Application submitted successfully" },
    });
  },
  getDashboard: () =>
    Promise.resolve({
      data: {
        name: "John Doe",
        email: "john@example.com",
        applications: mockApplications.map((app) => ({
          ...app,
          ngoId: mockNGOs.find((ngo) => ngo._id === app.ngoId),
        })),
      },
    }),
  updateProfile: (data) => Promise.resolve({ data }),
};

export const contactAPI = {
  submit: (data) => {
    console.log("Contact form submitted:", data);
    return Promise.resolve({ data: { message: "Message sent successfully" } });
  },
};

export default { authAPI, ngoAPI, volunteerAPI, contactAPI };
