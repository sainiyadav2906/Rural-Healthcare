const villages = [
  {
    id: 1,
    name: "Village A"
  },
  {
    id: 2,
    name: "Village B"
  },
  {
    id: 3,
    name: "Village C"
  },
  {
    id: 4,
    name: "Village D"
  }
];

const facilities = [
  {
    id: 1,
    name: "Primary Health Center",
    type: "Primary Care",
    description: "Basic medical services",
    available: true
  },
  {
    id: 2,
    name: "Community Health Center",
    type: "Community Care",
    description: "Advanced primary care",
    available: true
  },
  {
    id: 3,
    name: "District Hospital",
    type: "Specialized Treatment",
    description: "Specialized treatment",
    available: true
  }
];

const routes = {
  "Village A": {
    "Primary Health Center": {
      distance: 8,
      time: 20,
      type: "Primary Care"
    },
    "Community Health Center": {
      distance: 15,
      time: 35,
      type: "Community Care"
    },
    "District Hospital": {
      distance: 30,
      time: 65,
      type: "Specialized Treatment"
    }
  },

  "Village B": {
    "Primary Health Center": {
      distance: 5,
      time: 15,
      type: "Primary Care"
    },
    "Community Health Center": {
      distance: 12,
      time: 30,
      type: "Community Care"
    },
    "District Hospital": {
      distance: 25,
      time: 55,
      type: "Specialized Treatment"
    }
  },

  "Village C": {
    "Primary Health Center": {
      distance: 10,
      time: 25,
      type: "Primary Care"
    },
    "Community Health Center": {
      distance: 18,
      time: 40,
      type: "Community Care"
    },
    "District Hospital": {
      distance: 28,
      time: 60,
      type: "Specialized Treatment"
    }
  },

  "Village D": {
    "Primary Health Center": {
      distance: 7,
      time: 18,
      type: "Primary Care"
    },
    "Community Health Center": {
      distance: 14,
      time: 32,
      type: "Community Care"
    },
    "District Hospital": {
      distance: 22,
      time: 50,
      type: "Specialized Treatment"
    }
  }
};

module.exports = {
  villages,
  facilities,
  routes
};