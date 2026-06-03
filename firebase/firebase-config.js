/* math-science-yjr/firebase/firebase-config.js */

// paste your Firebase Config here:
const firebaseConfig = {
  apiKey: "AIzaSyBOt4BNvjvdF9lxow6KyhzUKymPz6A1GgA",
  authDomain: "mathscienceyjr-2691b.firebaseapp.com",
  projectId: "mathscienceyjr-2691b",
  storageBucket: "mathscienceyjr-2691b.firebasestorage.app",
  messagingSenderId: "585647469035",
  appId: "1:585647469035:web:b7e1aeaa887db27701e9ae",
  measurementId: "G-GCWFDXXEW7"
};

// Check if credentials are placeholders
const isMockMode = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("AIzaSyBOt4BNvjvdF9lxow6KyhzUKymPz6A1GgA");

// MOCK SYSTEM INITIALIZATION
const initMockDB = () => {
  const getOrSet = (key, defaultVal) => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        localStorage.setItem(key, JSON.stringify(defaultVal));
        return defaultVal;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn(`Corrupted localStorage key "${key}". Resetting to default.`, e);
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
  };

  // 1. Initial Mock Settings
  getOrSet("yjr_settings", {
    instituteName: "MathScienceYJR",
    logoUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200",
    contactNumber: "+91 98765 43210",
    whatsAppNumber: "919876543210",
    email: "admissions@mathscienceyjr.com",
    address: "YJR Towers, 4th Floor, Sector 62, Noida, UP, India",
    socialMedia: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    },
    googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562013898167!2d77.37687831508249!3d28.612911982425514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a5ece55555%3A0xe543e33c6af4c37f!2sMathScienceYJR!5e0!3m2!1sen!2sin!4v1622718228392!5m2!1sen!2sin"
  });

  // 2. Initial Homepage configuration
  getOrSet("yjr_homepage", {
    hero: {
      title: "Unlock Conceptual Excellence in STEM",
      description: "MathScienceYJR is India's leading academy for elite math, physics, and chemistry coaching. Master advanced boards, Olympiads, JEE, and NEET with our expert pedagogy.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      ctaText: "Apply Online Now",
      ctaLink: "/pages/admission.html"
    },
    sections: [
      { id: "statistics", enabled: true, order: 1 },
      { id: "whyChooseUs", enabled: true, order: 2 },
      { id: "courses", enabled: true, order: 3 },
      { id: "results", enabled: true, order: 4 },
      { id: "testimonials", enabled: true, order: 5 },
      { id: "gallery", enabled: true, order: 6 },
      { id: "announcements", enabled: true, order: 7 }
    ]
  });

  // 3. Initial Courses list
  getOrSet("yjr_courses", [
    {
      id: "course_1",
      title: "Olympiad Foundation & Advanced Math",
      category: "Mathematics",
      duration: "1 Year",
      fees: "₹45,000",
      description: "Comprehensive training for RMO, INMO, and JEE Advanced mathematics. Covers complex number systems, advanced algebra, calculus, and discrete theory.",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
      syllabus: ["Advanced Calculus", "Olympiad Combinatorics", "Analytical Geometry"],
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "course_2",
      title: "JEE & NEET Intensive Physics",
      category: "Physics",
      duration: "1 Year",
      fees: "₹50,000",
      description: "Rigorous concept building in Mechanics, Electromagnetism, and Modern Physics. Highly analytical problem sets aligned with national exam profiles.",
      imageUrl: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?auto=format&fit=crop&q=80&w=600",
      syllabus: ["Rotational Dynamics", "Electromagnetism", "Quantum Foundations"],
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "course_3",
      title: "Olympiad Chemistry Elite",
      category: "Chemistry",
      duration: "6 Months",
      fees: "₹28,000",
      description: "Advanced Physical Chemistry, Organic reaction mechanisms, and Inorganic Coordination chemistry for National level examinations.",
      imageUrl: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600",
      syllabus: ["Organic Synthesis", "Chemical Kinetics", "Thermodynamics"],
      visible: true,
      createdAt: new Date().toISOString()
    }
  ]);

  // 4. Initial Results list
  getOrSet("yjr_results", [
    {
      id: "res_1",
      studentName: "Aditya Verma",
      examName: "JEE Advanced 2025",
      marks: "336/360",
      rank: "AIR 12",
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
      achievementType: "Gold Medalist",
      featured: true,
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "res_2",
      studentName: "Sneha Nair",
      examName: "NEET UG 2025",
      marks: "715/720",
      rank: "AIR 28",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
      achievementType: "AIIMS New Delhi Merit",
      featured: true,
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "res_3",
      studentName: "Rohan Gupta",
      examName: "Math Olympiad (INMO)",
      marks: "92/100",
      rank: "National Rank 3",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      achievementType: "IMOTC Qualified",
      featured: true,
      visible: true,
      createdAt: new Date().toISOString()
    }
  ]);

  // 5. Initial Gallery list
  getOrSet("yjr_gallery", [
    {
      id: "gal_1",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
      caption: "Interactive Physics Lab Session",
      album: "Infrastructure",
      order: 1,
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal_2",
      imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
      caption: "Annual Science Exhibition & Olympiad Awards",
      album: "Events",
      order: 2,
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal_3",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
      caption: "Toppers Panel Group Discussion",
      album: "Seminars",
      order: 3,
      visible: true,
      createdAt: new Date().toISOString()
    }
  ]);

  // 6. Initial Testimonials list
  getOrSet("yjr_testimonials", [
    {
      id: "test_1",
      authorName: "Dr. Sandeep Verma",
      role: "Parent of Aditya Verma (AIR 12)",
      review: "MathScienceYJR completely changed my son's outlook on learning. Rather than rote memorization, they built rigorous analytical fundamentals.",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      videoUrl: "",
      featured: true,
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "test_2",
      authorName: "Sneha Nair",
      role: "NEET Topper 2025",
      review: "The weekly test feedback and absolute clarity of physics classes helped me conquer the hardest MCQ formats effortlessly.",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      videoUrl: "",
      featured: true,
      visible: true,
      createdAt: new Date().toISOString()
    }
  ]);

  // 7. Initial Announcements list
  getOrSet("yjr_announcements", [
    {
      id: "ann_1",
      title: "YJR Scholarship Test (YST) 2026",
      content: "The registration is open for YST 2026. Qualify to earn up to 100% fee waiver for advanced Olympiad batches.",
      pinned: true,
      visible: true,
      scheduledDate: new Date().toISOString().split('T')[0],
      expiryDate: "2026-08-30",
      createdAt: new Date().toISOString()
    },
    {
      id: "ann_2",
      title: "Olympiad Classes Batch Commences",
      content: "Advanced batches for High School Math & Physics Olympiads commence on June 15th. Reserve your desk now.",
      pinned: false,
      visible: true,
      scheduledDate: new Date().toISOString().split('T')[0],
      expiryDate: "2026-06-20",
      createdAt: new Date().toISOString()
    }
  ]);

  // 8. Initial Form Schemas
  getOrSet("yjr_forms", {
    inquiry: {
      formTitle: "Quick General Inquiry",
      enabled: true,
      fields: [
        { id: "fullName", type: "text", label: "Full Name", required: true, order: 1 },
        { id: "emailAddress", type: "email", label: "Email Address", required: true, order: 2 },
        { id: "phoneNumber", type: "tel", label: "Contact Phone", required: true, order: 3 },
        { id: "queryDescription", type: "textarea", label: "Message / Query", required: false, order: 4 }
      ]
    },
    admission: {
      formTitle: "Dynamic Online Admission Form",
      enabled: true,
      fields: [
        { id: "fullName", type: "text", label: "Student Full Name", required: true, order: 1 },
        { id: "parentName", type: "text", label: "Parent / Guardian Name", required: true, order: 2 },
        { id: "parentContact", type: "tel", label: "Parent Mobile Number", required: true, order: 3 },
        { id: "courseChoice", type: "select", label: "Select Course Path", options: ["Olympiad Foundation & Advanced Math", "JEE & NEET Intensive Physics", "Olympiad Chemistry Elite"], required: true, order: 4 },
        { id: "dateOfBirth", type: "date", label: "Date of Birth", required: true, order: 5 },
        { id: "previousPerformance", type: "text", label: "Previous Academic Grade/Percentage", required: false, order: 6 }
      ]
    },
    scholarship: {
      formTitle: "YST Scholarship Form",
      enabled: false,
      fields: [
        { id: "studentName", type: "text", label: "Student Name", required: true, order: 1 },
        { id: "schoolGrade", type: "text", label: "Current School Grade/Class", required: true, order: 2 },
        { id: "contactPhone", type: "tel", label: "Contact Phone", required: true, order: 3 }
      ]
    },
    demoClass: {
      formTitle: "Register for Demo Batch",
      enabled: true,
      fields: [
        { id: "studentName", type: "text", label: "Student Name", required: true, order: 1 },
        { id: "selectSubject", type: "select", label: "Demo Subject", options: ["Mathematics", "Physics", "Chemistry"], required: true, order: 2 },
        { id: "contactPhone", type: "tel", label: "Phone Number", required: true, order: 3 },
        { id: "selectDate", type: "date", label: "Preferred Date", required: true, order: 4 }
      ]
    }
  });

  // 9. Initial Submissions
  getOrSet("yjr_submissions", [
    {
      id: "sub_1",
      formId: "inquiry",
      data: {
        fullName: "Rahul Sen",
        emailAddress: "rahuls@gmail.com",
        phoneNumber: "+91 9988776655",
        queryDescription: "Interested in weekend classes for physics."
      },
      status: "new",
      notes: "No call placed yet",
      createdAt: new Date().toISOString()
    }
  ]);

  // 10. Admin Accounts
  getOrSet("yjr_admins", [
    { email: "admin@yjr.com", password: "admin" }
  ]);

  // 11. Media Library Files
  getOrSet("yjr_media", [
    {
      id: "med_1",
      name: "classroom.jpg",
      url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
      createdAt: new Date().toISOString()
    },
    {
      id: "med_2",
      name: "awards.jpg",
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
      createdAt: new Date().toISOString()
    }
  ]);
};

// Start Mock DB immediately
if (isMockMode) {
  initMockDB();
}

// PUBLIC MOCK API WRAPPERS MATCHING FIREBASE FUNCTIONS
export const getMockData = (collectionName) => {
  try {
    return JSON.parse(localStorage.getItem(`yjr_${collectionName}`)) || [];
  } catch (e) {
    console.warn(`Error parsing mock collection "${collectionName}". Resetting.`, e);
    return [];
  }
};

export const setMockData = (collectionName, data) => {
  localStorage.setItem(`yjr_${collectionName}`, JSON.stringify(data));
  // Trigger virtual snapshot update event
  window.dispatchEvent(new CustomEvent(`mock_${collectionName}_update`, { detail: data }));
};

// FIREBASE SDK FALLBACK LOGIC
let firebaseApp, firestoreDb, firebaseAuth, firebaseStorage;

// Dynamic imports if Firebase config is valid and script runs on client browser
if (!isMockMode) {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
    const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
    const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js");

    firebaseApp = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
    console.log("Firebase initialized successfully in online mode.");

    // Automatically verify if database is fresh and seed it if so
    setTimeout(checkAndSeedFirestore, 1000);
  } catch (err) {
    console.warn("Failed to load Firebase modules online, switching to Local DB mock mode.", err);
  }
}

// EXPORT ENGINE CONFIGURATION
export const app = firebaseApp;
export const db = firestoreDb;
export const auth = firebaseAuth;
export const storage = firebaseStorage;
export const configMode = isMockMode ? "offline" : "online";

// Memory cache to hold the public bundle during single page loads
let cachedPublicData = null;

// Helper to fetch/initialize the all-in-one public data document
async function getPublicDataBundle() {
  if (isMockMode) return null;
  if (cachedPublicData) return cachedPublicData;

  const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
  const docRef = doc(firestoreDb, "settings", "public_data");
  const snap = await getDoc(docRef);
  
  if (snap.exists()) {
    cachedPublicData = snap.data();
    return cachedPublicData;
  } else {
    // Return empty default schema if database has not seeded yet
    const defaultBundle = {
      settings: {
        instituteName: "MathScienceYJR",
        logoUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200",
        contactNumber: "+91 98765 43210",
        whatsAppNumber: "919876543210",
        email: "admissions@mathscienceyjr.com",
        address: "YJR Towers, 4th Floor, Sector 62, Noida, UP, India",
        socialMedia: { facebook: "https://facebook.com", instagram: "https://instagram.com", youtube: "https://youtube.com" },
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562013898167!2d77.37687831508249!3d28.612911982425514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a5ece55555%3A0xe543e33c6af4c37f!2sMathScienceYJR!5e0!3m2!1sen!2sin!4v1622718228392!5m2!1sen!2sin"
      },
      homepage: {
        hero: {
          title: "Unlock Conceptual Excellence in STEM",
          description: "MathScienceYJR is India's leading academy for elite math, physics, and chemistry coaching. Master advanced boards, Olympiads, JEE, and NEET with our expert pedagogy.",
          imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
          ctaText: "Apply Online Now",
          ctaLink: "/pages/admission.html"
        },
        sections: [
          { id: "statistics", enabled: true, order: 1 },
          { id: "whyChooseUs", enabled: true, order: 2 },
          { id: "courses", enabled: true, order: 3 },
          { id: "results", enabled: true, order: 4 },
          { id: "testimonials", enabled: true, order: 5 },
          { id: "gallery", enabled: true, order: 6 },
          { id: "announcements", enabled: true, order: 7 }
        ]
      },
      forms: {
        inquiry: {
          formTitle: "Quick General Inquiry",
          enabled: true,
          fields: [
            { id: "fullName", type: "text", label: "Full Name", required: true, order: 1 },
            { id: "emailAddress", type: "email", label: "Email Address", required: true, order: 2 },
            { id: "phoneNumber", type: "tel", label: "Contact Phone", required: true, order: 3 },
            { id: "queryDescription", type: "textarea", label: "Message / Query", required: false, order: 4 }
          ]
        },
        admission: {
          formTitle: "Dynamic Online Admission Form",
          enabled: true,
          fields: [
            { id: "fullName", type: "text", label: "Student Full Name", required: true, order: 1 },
            { id: "parentName", type: "text", label: "Parent / Guardian Name", required: true, order: 2 },
            { id: "parentContact", type: "tel", label: "Parent Mobile Number", required: true, order: 3 },
            { id: "courseChoice", type: "select", label: "Select Course Path", options: ["Olympiad Foundation & Advanced Math", "JEE & NEET Intensive Physics", "Olympiad Chemistry Elite"], required: true, order: 4 },
            { id: "dateOfBirth", type: "date", label: "Date of Birth", required: true, order: 5 },
            { id: "previousScore", type: "text", label: "Previous Class / Exam Score (%)", required: false, order: 6 }
          ]
        }
      },
      courses: [],
      results: [],
      gallery: [],
      testimonials: [],
      announcements: [],
      media: []
    };
    cachedPublicData = defaultBundle;
    return cachedPublicData;
  }
}

// Helper to save public bundle and sync local cache
async function savePublicDataBundle(data) {
  if (isMockMode) return;
  const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
  const docRef = doc(firestoreDb, "settings", "public_data");
  await setDoc(docRef, data);
  cachedPublicData = data;
}

// 1. GET SINGLE DOCUMENT
export async function getDocument(colName, docId) {
  if (isMockMode) {
    if (colName === "settings" && docId === "global") return getMockData("settings");
    if (colName === "homepage" && docId === "config") return getMockData("homepage");
    if (colName === "forms") {
      const allForms = getMockData("forms");
      return allForms[docId] || null;
    }
    return null;
  } else {
    if (colName === "submissions") {
      const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
      const docRef = doc(firestoreDb, colName, docId);
      const snap = await getDoc(docRef);
      return snap.exists() ? snap.data() : null;
    }
    const bundle = await getPublicDataBundle();
    if (colName === "settings" && docId === "global") return bundle.settings;
    if (colName === "homepage" && docId === "config") return bundle.homepage;
    if (colName === "forms") return bundle.forms?.[docId] || null;
    return null;
  }
}

// 2. SET SINGLE DOCUMENT
export async function setDocument(colName, docId, data) {
  if (isMockMode) {
    if (colName === "settings" && docId === "global") setMockData("settings", data);
    else if (colName === "homepage" && docId === "config") setMockData("homepage", data);
    else if (colName === "forms") {
      const allForms = getMockData("forms");
      allForms[docId] = data;
      setMockData("forms", allForms);
    }
    return true;
  } else {
    if (colName === "submissions") {
      const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
      const docRef = doc(firestoreDb, colName, docId);
      await setDoc(docRef, data, { merge: true });
      return true;
    }
    const bundle = await getPublicDataBundle();
    if (colName === "settings" && docId === "global") bundle.settings = data;
    else if (colName === "homepage" && docId === "config") bundle.homepage = data;
    else if (colName === "forms") {
      if (!bundle.forms) bundle.forms = {};
      bundle.forms[docId] = data;
    }
    await savePublicDataBundle(bundle);
    return true;
  }
}

// 3. GET ALL DOCUMENTS IN COLLECTION
export async function getCollection(colName) {
  if (isMockMode) {
    return getMockData(colName);
  } else {
    if (colName === "submissions") {
      const { collection, getDocs, query, orderBy } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
      const colRef = collection(firestoreDb, colName);
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const items = [];
      snap.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    }
    const bundle = await getPublicDataBundle();
    const items = bundle[colName] || [];
    return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

// 4. ADD DOCUMENT TO COLLECTION
export async function addDocument(colName, data) {
  const item = { ...data, createdAt: new Date().toISOString() };
  if (isMockMode) {
    const list = getMockData(colName);
    item.id = colName.substring(0, 3) + "_" + Math.random().toString(36).substring(2, 9);
    list.unshift(item);
    setMockData(colName, list);
    return item.id;
  } else {
    if (colName === "submissions") {
      const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
      const colRef = collection(firestoreDb, colName);
      const docRef = await addDoc(colRef, item);
      return docRef.id;
    }
    const bundle = await getPublicDataBundle();
    if (!bundle[colName]) bundle[colName] = [];
    item.id = colName.substring(0, 3) + "_" + Math.random().toString(36).substring(2, 9);
    bundle[colName].unshift(item);
    await savePublicDataBundle(bundle);
    return item.id;
  }
}

// 5. UPDATE DOCUMENT IN COLLECTION
export async function updateDocument(colName, docId, updateData) {
  if (isMockMode) {
    const list = getMockData(colName);
    const idx = list.findIndex(item => item.id === docId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updateData };
      setMockData(colName, list);
      return true;
    }
    return false;
  } else {
    if (colName === "submissions") {
      const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
      const docRef = doc(firestoreDb, colName, docId);
      await updateDoc(docRef, updateData);
      return true;
    }
    const bundle = await getPublicDataBundle();
    const list = bundle[colName] || [];
    const idx = list.findIndex(item => item.id === docId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updateData };
      bundle[colName] = list;
      await savePublicDataBundle(bundle);
      return true;
    }
    return false;
  }
}

// 6. DELETE DOCUMENT FROM COLLECTION
export async function deleteDocument(colName, docId) {
  if (isMockMode) {
    let list = getMockData(colName);
    list = list.filter(item => item.id !== docId);
    setMockData(colName, list);
    return true;
  } else {
    if (colName === "submissions") {
      const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
      const docRef = doc(firestoreDb, colName, docId);
      await deleteDoc(docRef);
      return true;
    }
    const bundle = await getPublicDataBundle();
    let list = bundle[colName] || [];
    list = list.filter(item => item.id !== docId);
    bundle[colName] = list;
    await savePublicDataBundle(bundle);
    return true;
  }
}

// 7. REAL-TIME SNAPSHOT LISTENER
export function listenCollection(colName, callback) {
  if (isMockMode) {
    const handler = (e) => callback(e.detail);
    window.addEventListener(`mock_${colName}_update`, handler);
    callback(getMockData(colName));
    return () => window.removeEventListener(`mock_${colName}_update`, handler);
  } else {
    if (colName === "submissions") {
      let unsubscribe = () => {};
      import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js").then(({ collection, query, orderBy, onSnapshot }) => {
        const q = query(collection(firestoreDb, colName), orderBy("createdAt", "desc"));
        unsubscribe = onSnapshot(q, (snapshot) => {
          const items = [];
          snapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
          });
          callback(items);
        });
      });
      return () => unsubscribe();
    }
    let unsubscribe = () => {};
    import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js").then(({ doc, onSnapshot }) => {
      const docRef = doc(firestoreDb, "settings", "public_data");
      unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const items = data[colName] || [];
          const sorted = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          callback(sorted);
        } else {
          callback([]);
        }
      });
    });
    return () => unsubscribe();
  }
}

// 8. ADMIN LOGIN AUTH SERVICE
export async function adminLogin(email, password) {
  if (isMockMode) {
    const admins = getMockData("admins");
    const admin = admins.find(a => a.email === email && a.password === password);
    if (admin) {
      sessionStorage.setItem("yjr_admin_auth", JSON.stringify({ email }));
      return { email };
    }
    throw new Error("Invalid Administrator Credentials");
  } else {
    const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js");
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  }
}

// 9. ADMIN LOGOUT SERVICE
export async function adminLogout() {
  if (isMockMode) {
    sessionStorage.removeItem("yjr_admin_auth");
    return true;
  } else {
    const { signOut } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js");
    await signOut(firebaseAuth);
    return true;
  }
}

// 10. CHECK CURRENT SESSION
export function checkAdminSession(callback) {
  if (isMockMode) {
    const user = JSON.parse(sessionStorage.getItem("yjr_admin_auth"));
    callback(user);
    return () => { };
  } else {
    let unsubscribe = () => { };
    import("https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js").then(({ onAuthStateChanged }) => {
      unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        callback(user);
      });
    });
    return () => unsubscribe();
  }
}

// Helper function to resize and compress images under 1MB for Firestore
function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      // Non-image files (e.g. PDFs) read directly as data URL
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

// 11. MEDIA UPLOAD SERVICE
export async function uploadMedia(file) {
  try {
    const dataUrl = await compressImage(file);
    if (isMockMode) {
      const mediaList = getMockData("media");
      const newMedia = {
        id: "med_" + Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: dataUrl,
        createdAt: new Date().toISOString()
      };
      mediaList.unshift(newMedia);
      setMockData("media", mediaList);
      return newMedia.url;
    } else {
      // Save Base64 data URL directly in Firestore (No Firebase Storage needed!)
      const newMedia = {
        name: file.name,
        url: dataUrl,
        createdAt: new Date().toISOString()
      };
      await addDocument("media", newMedia);
      return dataUrl;
    }
  } catch (err) {
    console.error("Media conversion/upload failed: ", err);
    throw err;
  }
}

// 12. AUTO-SEED DATABASE IF FRESH/EMPTY
async function checkAndSeedFirestore() {
  try {
    const { doc, getDoc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
    const bundleRef = doc(firestoreDb, "settings", "public_data");
    const docSnap = await getDoc(bundleRef);

    if (!docSnap.exists()) {
      console.log("Firestore public_data bundle not found. Auto-seeding default database structure...");

      const defaultBundle = {
        settings: {
          instituteName: "MathScienceYJR",
          logoUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200",
          contactNumber: "+91 98765 43210",
          whatsAppNumber: "919876543210",
          email: "admissions@mathscienceyjr.com",
          address: "YJR Towers, 4th Floor, Sector 62, Noida, UP, India",
          socialMedia: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            youtube: "https://youtube.com"
          },
          googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562013898167!2d77.37687831508249!3d28.612911982425514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a5ece55555%3A0xe543e33c6af4c37f!2sMathScienceYJR!5e0!3m2!1sen!2sin!4v1622718228392!5m2!1sen!2sin"
        },
        homepage: {
          hero: {
            title: "Unlock Conceptual Excellence in STEM",
            description: "MathScienceYJR is India's leading academy for elite math, physics, and chemistry coaching. Master advanced boards, Olympiads, JEE, and NEET with our expert pedagogy.",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
            ctaText: "Apply Online Now",
            ctaLink: "/pages/admission.html"
          },
          sections: [
            { id: "statistics", enabled: true, order: 1 },
            { id: "whyChooseUs", enabled: true, order: 2 },
            { id: "courses", enabled: true, order: 3 },
            { id: "results", enabled: true, order: 4 },
            { id: "testimonials", enabled: true, order: 5 },
            { id: "gallery", enabled: true, order: 6 },
            { id: "announcements", enabled: true, order: 7 }
          ]
        },
        forms: {
          inquiry: {
            formTitle: "Quick General Inquiry",
            enabled: true,
            fields: [
              { id: "fullName", type: "text", label: "Full Name", required: true, order: 1 },
              { id: "emailAddress", type: "email", label: "Email Address", required: true, order: 2 },
              { id: "phoneNumber", type: "tel", label: "Contact Phone", required: true, order: 3 },
              { id: "queryDescription", type: "textarea", label: "Message / Query", required: false, order: 4 }
            ]
          },
          admission: {
            formTitle: "Dynamic Online Admission Form",
            enabled: true,
            fields: [
              { id: "fullName", type: "text", label: "Student Full Name", required: true, order: 1 },
              { id: "parentName", type: "text", label: "Parent / Guardian Name", required: true, order: 2 },
              { id: "parentContact", type: "tel", label: "Parent Mobile Number", required: true, order: 3 },
              { id: "courseChoice", type: "select", label: "Select Course Path", options: ["Olympiad Foundation & Advanced Math", "JEE & NEET Intensive Physics", "Olympiad Chemistry Elite"], required: true, order: 4 },
              { id: "dateOfBirth", type: "date", label: "Date of Birth", required: true, order: 5 },
              { id: "previousScore", type: "text", label: "Previous Class / Exam Score (%)", required: false, order: 6 }
            ]
          }
        },
        courses: [
          {
            id: "course_1",
            title: "Olympiad Foundation & Advanced Math",
            category: "Mathematics",
            duration: "1 Year",
            fees: "₹45,000",
            description: "Comprehensive training for RMO, INMO, and JEE Advanced mathematics. Covers complex number systems, advanced algebra, calculus, and discrete theory.",
            imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
            syllabus: ["Advanced Calculus", "Olympiad Combinatorics", "Analytical Geometry"],
            visible: true,
            createdAt: new Date().toISOString()
          },
          {
            id: "course_2",
            title: "JEE & NEET Intensive Physics",
            category: "Physics",
            duration: "1 Year",
            fees: "₹50,000",
            description: "Rigorous concept building in Mechanics, Electromagnetism, and Modern Physics. Highly analytical problem sets aligned with national exam profiles.",
            imageUrl: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?auto=format&fit=crop&q=80&w=600",
            syllabus: ["Rotational Dynamics", "Electromagnetism", "Quantum Foundations"],
            visible: true,
            createdAt: new Date().toISOString()
          },
          {
            id: "course_3",
            title: "Olympiad Chemistry Elite",
            category: "Chemistry",
            duration: "6 Months",
            fees: "₹28,000",
            description: "Advanced Physical Chemistry, Organic reaction mechanisms, and Inorganic Coordination chemistry for National level examinations.",
            imageUrl: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600",
            syllabus: ["Organic Synthesis", "Chemical Kinetics", "Thermodynamics"],
            visible: true,
            createdAt: new Date().toISOString()
          }
        ],
        results: [
          {
            id: "res_1",
            studentName: "Aditya Verma",
            examName: "JEE Advanced 2025",
            marks: "336/360",
            rank: "AIR 12",
            photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
            achievementType: "Gold Medalist",
            featured: true,
            visible: true,
            createdAt: new Date().toISOString()
          },
          {
            id: "res_2",
            studentName: "Sneha Nair",
            examName: "NEET UG 2025",
            marks: "715/720",
            rank: "AIR 28",
            photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
            achievementType: "AIIMS New Delhi Merit",
            featured: true,
            visible: true,
            createdAt: new Date().toISOString()
          },
          {
            id: "res_3",
            studentName: "Rohan Gupta",
            examName: "Math Olympiad (INMO)",
            marks: "92/100",
            rank: "National Rank 3",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
            achievementType: "IMOTC Qualified",
            featured: true,
            visible: true,
            createdAt: new Date().toISOString()
          }
        ],
        testimonials: [
          {
            id: "test_1",
            authorName: "Dr. Sandeep Verma",
            role: "Parent of Aditya Verma (AIR 12)",
            review: "MathScienceYJR completely changed my son's outlook on learning. Rather than rote memorization, they built rigorous analytical fundamentals.",
            photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
            videoUrl: "",
            featured: true,
            visible: true,
            createdAt: new Date().toISOString()
          },
          {
            id: "test_2",
            authorName: "Sneha Nair",
            role: "NEET Topper 2025",
            review: "The weekly test feedback and absolute clarity of physics classes helped me conquer the hardest MCQ formats effortlessly.",
            photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
            videoUrl: "",
            featured: true,
            visible: true,
            createdAt: new Date().toISOString()
          }
        ],
        announcements: [
          {
            id: "ann_1",
            title: "YJR Scholarship Test (YST) 2026",
            content: "The registration is open for YST 2026. Qualify to earn up to 100% fee waiver for advanced Olympiad batches.",
            pinned: true,
            visible: true,
            scheduledDate: new Date().toISOString().split('T')[0],
            expiryDate: "2026-08-30",
            createdAt: new Date().toISOString()
          },
          {
            id: "ann_2",
            title: "Olympiad Classes Batch Commences",
            content: "Advanced batches for High School Math & Physics Olympiads commence on June 15th. Reserve your desk now.",
            pinned: false,
            visible: true,
            scheduledDate: new Date().toISOString().split('T')[0],
            expiryDate: "2026-06-20",
            createdAt: new Date().toISOString()
          }
        ],
        media: [
          {
            id: "med_1",
            name: "classroom.jpg",
            url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
            createdAt: new Date().toISOString()
          },
          {
            id: "med_2",
            name: "awards.jpg",
            url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
            createdAt: new Date().toISOString()
          }
        ],
        gallery: [
          {
            id: "gal_1",
            imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
            caption: "Interactive Physics Lab Session",
            album: "Infrastructure",
            order: 1,
            visible: true,
            createdAt: new Date().toISOString()
          },
          {
            id: "gal_2",
            imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
            caption: "Annual Science Exhibition & Olympiad Awards",
            album: "Events",
            order: 2,
            visible: true,
            createdAt: new Date().toISOString()
          },
          {
            id: "gal_3",
            imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
            caption: "Toppers Panel Group Discussion",
            album: "Seminars",
            order: 3,
            visible: true,
            createdAt: new Date().toISOString()
          }
        ]
      };

      await setDoc(bundleRef, defaultBundle);
      console.log("Firestore successfully seeded with bundled public data!");
    } else {
      console.log("Firestore bundled data exists. Skipping database seeding.");
    }
  } catch (err) {
    console.error("Failed checking or seeding Firestore: ", err);
  }
}
