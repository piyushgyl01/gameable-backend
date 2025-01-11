const express = require("express");
const app = express();
const { initialiseDatabase } = require("./db/db.connect.js");
const Quest = require("./models/quest.models.js");

initialiseDatabase();

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const questsForDB = [
//   {
//     title: "MAKE MR BEAST LOOK LIKE A KID",
//     generations: [
//       {
//         num: 1,
//         benchmarks: ["zooms and caption style change", "longform start", "PJM"],
//         logs: [
//           "Researched MrBeast's video editing style.",
//           "Experimented with different zoom effects in Premiere Pro.",
//           "Started outlining the longform video structure.",
//         ],
//       },
//       {
//         num: 2,
//         benchmarks: [
//           "advanced transitions",
//           "viral hooks",
//           "thumbnail mastery",
//         ],
//         logs: [
//           "Mastered complex transition effects",
//           "Created 10 viral-style video hooks",
//           "Designed eye-catching thumbnails with high CTR",
//         ],
//       },
//     ],
//   },
//   {
//     title: "KILL AT NEOG",
//     generations: [
//       {
//         num: 1,
//         benchmarks: ["apna college projects"],
//         logs: [
//           "Reviewed Apna College project tutorials.",
//           "Started working on a basic project to practice concepts.",
//         ],
//       },
//       {
//         num: 2,
//         benchmarks: ["advanced React patterns", "full-stack deployment"],
//         logs: [
//           "Implemented custom hooks and context",
//           "Deployed first full-stack application",
//           "Integrated MongoDB with Express backend",
//         ],
//       },
//       {
//         num: 3,
//         benchmarks: ["system design", "optimization"],
//         logs: [
//           "Studied scalable architecture patterns",
//           "Implemented Redis caching",
//           "Optimized React render performance",
//         ],
//       },
//     ],
//   },
//   {
//     title: "TINKERING WITH SWIFT",
//     generations: [
//       {
//         num: 1,
//         benchmarks: ["swift lang concepts", "basic apps of hws"],
//         logs: [
//           "Completed the Swift tour in the official documentation.",
//           "Started building a simple 'Hello, World!' app in Xcode.",
//         ],
//       },
//       {
//         num: 2,
//         benchmarks: ["CoreData", "SwiftUI animations"],
//         logs: [
//           "Implemented persistent storage with CoreData",
//           "Created custom view transitions",
//           "Built complex UI animations",
//         ],
//       },
//     ],
//   },
//   // ... rest of your original quests ...
//   {
//     title: "LEARN GAME DEV",
//     generations: [
//       {
//         num: 1,
//         benchmarks: ["Unity basics", "C# fundamentals"],
//         logs: [
//           "Completed Unity beginner tutorials",
//           "Built first 2D platformer game",
//         ],
//       },
//       {
//         num: 2,
//         benchmarks: ["3D modeling", "game physics"],
//         logs: [
//           "Created basic 3D models in Blender",
//           "Implemented realistic physics in Unity",
//         ],
//       },
//       {
//         num: 3,
//         benchmarks: ["multiplayer", "optimization"],
//         logs: [
//           "Added multiplayer functionality",
//           "Optimized game performance",
//           "Implemented server-side validation",
//         ],
//       },
//     ],
//   },
//   {
//     title: "MASTER SYSTEM DESIGN",
//     generations: [
//       {
//         num: 1,
//         benchmarks: ["basic architecture", "scalability"],
//         logs: [
//           "Studied distributed systems concepts",
//           "Designed first high-level architecture",
//         ],
//       },
//       {
//         num: 2,
//         benchmarks: ["microservices", "load balancing"],
//         logs: [
//           "Implemented microservices architecture",
//           "Set up Nginx load balancer",
//           "Deployed to Kubernetes cluster",
//         ],
//       },
//     ],
//   },
// ];

// async function createNewQuests(newQuests) {
//   try {
//     const quests = await Quest.insertMany(newQuests);
//     console.log("Saved quests in DB: ", quests);
//   } catch (error) {
//     console.log("You suck lmao see this error while saving lol", error);
//   }
// }

// createNewQuests(questsForDB);

// CRUD for quests

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/quests", async (req, res) => {
  try {
    const quests = await Quest.find({});
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/quests", async (req, res) => {
  try {
    const newQuest = new Quest(req.body);
    const savedQuest = await newQuest.save();
    res.status(201).json(savedQuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/quests/:id", async (req, res) => {
  try {
    const deletedQuest = await Quest.findByIdAndDelete(req.params.id);

    if (!deletedQuest) {
      return res.status(404).json({ error: "Quest not found" });
    }

    res.json({ message: "Quest deleted successfully", quest: deletedQuest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/quests/:id", async (req, res) => {
  try {
    const updatedQuest = await Quest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!updatedQuest) {
      return res.status(404).json({ error: "Quest not found" });
    }

    res.json(updatedQuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
