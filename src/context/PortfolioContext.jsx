import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "sonner";

const defaultPortfolioData = {
  studentDetails: {
    name: "Vinaya Kumar",
    location: "Odisha, India",
    email: "vinayakumar464@gmail.com",
    phone: "+91-77500 28053",
    github: "",
    profileImage: "",
  },
  typingTexts: [
    "I am a Data Science Enthusiast.",
    "I am a Data Analyst.",
    "I am a Machine Learning Learner.",
    "I am a Developer.",
  ],
  summary:
    "Data Science enthusiast skilled in Python, MySQL, NLP, and machine learning, with experience in data cleaning, exploratory data analysis, and building predictive models. Proficient in Pandas, NumPy, Scikit-learn, and visualization tools. Worked on real-world NLP and analytics projects, including sentiment analysis and classification systems. Strong communication, problem-solving, and collaboration skills, with a passion for using data to drive practical business decisions.",
  academics: [
    {
      id: "1",
      degree: "Bachelor of Technology (Computer Science and Engineering)",
      institute:
        "Gandhi Institute of Engineering and Technology, Gunupur, Odisha",
      graduationDate: "July 2026",
    },
  ],
  skills: {
    technical: [
      "Python",
      "C",
      "Java",
      "Streamlit",
      "MySQL",
      "TensorFlow (Keras)",
      "Scikit-learn",
      "Image Processing",
      "Data Preprocessing",
      "NLP",
    ],
    interests: [
      "Data Analysis",
      "Data Science",
      "Machine Learning",
      "Deep Learning",
    ],
    soft: ["Attention to Detail", "Time Management", "Teamwork", "Adaptability"],
  },
  certifications: [
    {
      id: "1",
      name: "Data Analysis Intern",
      issuer: "Millennium Software Solutions",
      link: "",
      credentialId: "",
      badge: "",
    },
    {
      id: "2",
      name: "Data Science Professional",
      issuer: "Oracle University",
      link: "",
      credentialId: "",
      badge: "",
    },
    {
      id: "3",
      name: "Data Analysis with Python",
      issuer: "IBM",
      link: "",
      credentialId: "",
      badge: "",
    },
    {
      id: "4",
      name: "Foundation of AI and ML",
      issuer: "Microsoft",
      link: "",
      credentialId: "",
      badge: "",
    },
    {
      id: "5",
      name: "Quantitative Research",
      issuer: "JPMorgan Chase & Co.",
      link: "",
      credentialId: "",
      badge: "",
    },
  ],
  internshipProjects: [
    {
      id: "1",
      title: "Email and SMS Spam Detection",
      category: "Internship Project",
      description:
        "Built high-efficiency NLP preprocessing pipelines using TF-IDF and Count Vectorizer, improving data cleaning speed and enabling processing of 1M+ email and SMS messages. Developed Naive Bayes and Logistic Regression models achieving around 92% accuracy and reducing false positives.",
      liveDemo: "",
      repository: "",
    },
    {
      id: "2",
      title: "Emotion Recognition using Facial Expression",
      category: "Internship Project",
      description:
        "Designed and fine-tuned a CNN model detecting six facial emotions with ~92% accuracy using augmented datasets to improve robustness. Integrated with OpenCV for real-time webcam-based detection.",
      liveDemo: "",
      repository: "",
    },
    {
      id: "3",
      title: "Intelligent Customer Sentiment Analysis",
      category: "Internship Project",
      description:
        "Developed a DistilBERT-based sentiment analysis pipeline, boosting classification accuracy by ~15%. Built an interactive sentiment dashboard to cut false positives and reduce interpretation time.",
      liveDemo: "",
      repository: "",
    },
  ],
  personalProjects: [],
  internships: [
    {
      id: "1",
      company: "Millennium Software Solutions, Visakhapatnam",
      role: "Data Analytics Intern",
      duration: "Apr 2024 – Aug 2025",
      bullets: [
        "Optimized and transformed datasets exceeding 1M records, increasing data reliability and accelerating analysis workflows.",
        "Developed high-accuracy ML models and interactive dashboards, improving predictive performance and stakeholder engagement, contributing to operational efficiency.",
      ],
    },
    {
      id: "2",
      company: "Naresh I Technology, Hyderabad",
      role: "Python Data Science Intern",
      duration: "May 2025 – Jul 2025",
      bullets: [
        "Processed and refined 50,000+ text samples, reducing dataset noise and boosting training accuracy.",
        "Built ML models with high precision for spam detection and created visual reports to improve team decision-making.",
      ],
    },
  ],
  visitors: [],
};

const PortfolioContext = createContext(undefined);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editPassword, setEditPassword] = useState("");

  // Fetch portfolio data from database
  const fetchPortfolioData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/portfolio", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }
      const data = await response.json();
      console.log("Frontend fetched data:", data);

      if (data) {
        setPortfolioData({
          studentDetails: data.studentDetails,
          typingTexts: data.typingTexts,
          summary: data.summary,
          academics: data.academics,
          skills: data.skills,
          certifications: data.certifications,
          internshipProjects: data.internshipProjects,
          personalProjects: data.personalProjects,
          internships: data.internships,
          visitors: [],
        });
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVisitors = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/visitors", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch visitors");
      }
      const data = await response.json();

      if (data) {
        setVisitors(
          data.map((v) => ({
            email: v.email,
            dateVisited: v.dateVisited,
          }))
        );
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
    fetchVisitors();
  }, []);

  const updatePortfolioData = async (newData) => {
    if (!editPassword) {
      toast.error("Please enter edit mode first");
      return;
    }

    try {
      const updates = {};
      if (newData.studentDetails !== undefined)
        updates.student_details = newData.studentDetails;
      if (newData.typingTexts !== undefined)
        updates.typing_texts = newData.typingTexts;
      if (newData.summary !== undefined) updates.summary = newData.summary;
      if (newData.academics !== undefined) updates.academics = newData.academics;
      if (newData.skills !== undefined) updates.skills = newData.skills;
      if (newData.certifications !== undefined)
        updates.certifications = newData.certifications;
      if (newData.internshipProjects !== undefined)
        updates.internship_projects = newData.internshipProjects;
      if (newData.personalProjects !== undefined)
        updates.personal_projects = newData.personalProjects;
      if (newData.internships !== undefined)
        updates.internships = newData.internships;

      const response = await fetch("http://localhost:5001/api/portfolio/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: editPassword,
          updates,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        // If unauthorized (401), try with the old password (in case backend isn't deployed)
        // Note: In our local backend we handle both, but let's keep the retry logic if we want to be robust,
        // though strictly speaking we just replaced the backend so we control the passwords.
        // I'll simplify it to just error out if failed, as we control the backend now.
        throw new Error(data.error || "Failed to save changes");
      }

      // Update local state by re-fetching from DB to ensure consistency
      await fetchPortfolioData();
      toast.success("Changes saved successfully");
    } catch (err) {
      console.error("Error in updatePortfolioData:", err);
      toast.error("Failed to save changes: " + err.message);
    }
  };

  const addVisitor = async (email) => {
    try {
      const response = await fetch("http://localhost:5001/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "Email already exists") {
          return;
        }
        console.error("Error adding visitor:", errorData.error);
        return;
      }

      setVisitors((prev) => {
        const exists = prev.some((v) => v.email === email);
        if (exists) return prev;
        return [{ email, dateVisited: new Date().toISOString() }, ...prev];
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const getBadgeCount = () => {
    return portfolioData.certifications.filter((c) => c.badge).length;
  };

  const getCertificationCount = () => {
    return portfolioData.certifications.length;
  };

  const validatePassword = async (password) => {
    try {


      const response = await fetch("http://localhost:5001/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setEditPassword(password);
      }

      return data.success;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await fetch("http://localhost:5001/api/portfolio/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error("Error changing password:", err);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updatePortfolioData,
        isEditMode,
        setIsEditMode,
        visitors,
        addVisitor,
        getBadgeCount,
        getCertificationCount,
        validatePassword,
        isLoading,
        editPassword,
        setEditPassword,
        changePassword,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
