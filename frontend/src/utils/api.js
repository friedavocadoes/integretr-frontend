// Mock API for frontend-only demo
const mockNGOs = [
  {
    _id: '1',
    name: 'Education for All Foundation',
    category: 'Education',
    description: 'Providing quality education to underprivileged children across rural areas.',
    location: { city: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.209 },
    contact: { website: 'https://educationforall.org' },
    requirements: [
      {
        _id: 'req1',
        title: 'Math Tutor Needed',
        description: 'Looking for volunteers to teach mathematics to children aged 8-12.',
        skills: ['Teaching', 'Mathematics'],
        category: 'Education',
        location: 'Delhi',
        createdAt: new Date()
      }
    ]
  },
  {
    _id: '2',
    name: 'Green Earth Initiative',
    category: 'Environment',
    description: 'Working towards environmental conservation and sustainable development.',
    location: { city: 'Mumbai', state: 'Maharashtra', lat: 19.076, lng: 72.8777 },
    contact: { website: 'https://greenearth.org' },
    requirements: [
      {
        _id: 'req2',
        title: 'Tree Plantation Drive',
        description: 'Join us for a community tree plantation event this weekend.',
        skills: ['Event Management', 'Environmental Awareness'],
        category: 'Environment',
        location: 'Mumbai',
        createdAt: new Date()
      }
    ]
  },
  {
    _id: '3',
    name: 'Health Care Heroes',
    category: 'Health',
    description: 'Providing healthcare services to remote and underserved communities.',
    location: { city: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
    contact: { website: 'https://healthcareheroes.org' },
    requirements: [
      {
        _id: 'req3',
        title: 'Medical Camp Volunteer',
        description: 'Assist in organizing medical camps in rural areas.',
        skills: ['Healthcare', 'Organization'],
        category: 'Health',
        location: 'Bangalore',
        createdAt: new Date()
      }
    ]
  }
];

const mockUsers = {
  ngos: [
    { id: '1', name: 'Education for All Foundation', email: 'admin@educationforall.org', category: 'Education' }
  ],
  volunteers: [
    { id: '1', name: 'John Doe', email: 'john@example.com' }
  ]
};

const mockApplications = [];

// Haversine utility (km)
function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Full list of Indian states (29 as requested)
const INDIA_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

function listStates() {
  return INDIA_STATES;
}

function listCities(state) {
  return Array.from(new Set(
    mockNGOs
      .filter(n => (state ? n.location.state === state : true))
      .map(n => n.location.city)
  )).sort();
}

export const authAPI = {
  ngoRegister: (data) => Promise.resolve({ 
    data: { 
      token: 'mock-token', 
      ngo: { id: '1', name: data.name, email: data.email, category: data.category } 
    } 
  }),
  ngoLogin: (data) => Promise.resolve({ 
    data: { 
      token: 'mock-token', 
      ngo: mockUsers.ngos.find(u => u.email === data.email) || mockUsers.ngos[0] 
    } 
  }),
  volunteerRegister: (data) => Promise.resolve({ 
    data: { 
      token: 'mock-token', 
      volunteer: { id: '1', name: data.name, email: data.email } 
    } 
  }),
  volunteerLogin: (data) => Promise.resolve({ 
    data: { 
      token: 'mock-token', 
      volunteer: mockUsers.volunteers.find(u => u.email === data.email) || mockUsers.volunteers[0] 
    } 
  }),
};

export const ngoAPI = {
  search: (params) => {
    let filtered = [...mockNGOs];
    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(ngo => ngo.category === params.category);
    }
    if (params.state) {
      filtered = filtered.filter(ngo => ngo.location.state === params.state);
    }
    if (params.city) {
      filtered = filtered.filter(ngo => 
        ngo.location.city.toLowerCase().includes(params.city.toLowerCase())
      );
    }

    if (typeof params?.lat === 'number' && typeof params?.lng === 'number') {
      filtered = filtered
        .map(ngo => {
          const { lat, lng } = ngo.location;
          const distanceKm = (typeof lat === 'number' && typeof lng === 'number')
            ? haversineKm(params.lat, params.lng, lat, lng)
            : null;
          return { ...ngo, distanceKm };
        })
        .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
    }

    return Promise.resolve({ data: filtered });
  },
  getDetails: (id) => Promise.resolve({ 
    data: mockNGOs.find(ngo => ngo._id === id) 
  }),
  postRequirement: (data) => Promise.resolve({ 
    data: { message: 'Requirement posted successfully', requirement: data } 
  }),
  getDashboard: () => Promise.resolve({ 
    data: { 
      ngo: mockNGOs[0], 
      applications: mockApplications 
    } 
  }),
  updateApplicationStatus: () => Promise.resolve({ 
    data: { message: 'Application status updated' } 
  }),
  getStates: () => Promise.resolve({ data: listStates() }),
  getCities: (state) => Promise.resolve({ data: listCities(state) }),
};

export const volunteerAPI = {
  apply: (data) => {
    mockApplications.push({
      ngoId: data.ngoId,
      requirementId: data.requirementId,
      status: 'pending',
      appliedAt: new Date()
    });
    return Promise.resolve({ data: { message: 'Application submitted successfully' } });
  },
  getDashboard: () => Promise.resolve({ 
    data: { 
      name: 'John Doe',
      email: 'john@example.com',
      applications: mockApplications.map(app => ({
        ...app,
        ngoId: mockNGOs.find(ngo => ngo._id === app.ngoId)
      }))
    } 
  }),
  updateProfile: (data) => Promise.resolve({ data }),
};

export const contactAPI = {
  submit: (data) => {
    console.log('Contact form submitted:', data);
    return Promise.resolve({ data: { message: 'Message sent successfully' } });
  },
};

export default { authAPI, ngoAPI, volunteerAPI, contactAPI };