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
};

export default defaultPortfolioData;
