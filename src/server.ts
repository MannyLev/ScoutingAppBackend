import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import { prisma } from "./index";
import { z } from "zod";
import { validate } from "./validate";
import { Prisma } from "@prisma/client";
import { getMatchFields } from "./getMatchFields";
import { getTeamFields } from "./getTeamFields";
import { getTeamPerformanceField } from "./getTeamPerformanceField";
import { getMatch } from "./getMatch"
import { getMatchNumbersForTeam } from "./getMatchNumbersForTeam";
import { getRecordsCount } from "./getRecordsCount";
import { putNewTeamPerformance } from "./putNewTeamPerformance";
import { getNumberOfMatches } from "./getNumberOfMatches";
import { getMatchesWithTeam } from "./getMatchesWithTeam";
import { getTeamNames } from "./getTeamNames";
import { getTeamsInMatch } from "./getTeamsInMatch";
import { getTeamPerformance } from "./getTeamPerformance";
import { getMatchNumbers } from "./getMatchNumbers";
import { getSchemaMaxima } from "./getSchemaMaxima";
import { getSchemaAverages } from "./getSchemaAverages";
import { getTeamOverview } from "./getTeamOverview";
import { getNumericFields } from "./getNumericFields";

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: "*"
}));



// Gets all of the values under the "field" key for a specific team
app.post("/getTeamFields", validate(z.object({
  body: z.object({
    field: z.string({
      required_error: "Field is required",
    }),
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    teamName: z.string({
      required_error: "Team name is required"
    })
  })
})),async (req, res) => {
 try {
  const json = req.body;
  const data = await getTeamFields(json.field, json.tournamentName, json.teamName);
  console.log("Nothin' But A Good Time by Poison and values found ", (await data).toString());
  res.status(200).json({
    data: data
  }).end(); 
 } catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({ e })
  }
 }
})

// Gets all of the values under the "field" key for a specific match
app.post("/getMatchFields", validate(z.object({
  body: z.object({
    field: z.string({
      required_error: "Field is required",
    }),
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    matchNumber: z.number({
      required_error: "Match number is required"
    })
  })
})), async (req, res) => {
  try {
    const json = req.body;
  console.log("Army of the Night by Powerwolf and items requested ", json);
  const data = await getMatchFields(json.field, json.tournamentName, json.matchNumber);
  res.status(200).json({
    data: data
  }).end();
  } catch(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ e })
    }
  }
})

// Gets the value under the "field" key for a specific team performance
app.post("/getTeamPerformanceField", validate(z.object({
  body: z.object({
    field: z.string({
      required_error: "Field is required",
    }),
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    matchNumber: z.number({
      required_error: "Match number is required"
    }),
    teamName: z.string({
      required_error: "Team name is required"
    })
  })
})), async (req, res) => {
  try {
    const json = req.body;
    console.log(json);
    console.log("Heartwork by Carcass and items requested ", json);
    const data = await getTeamPerformanceField(json.field, json.tournamentName, json.teamName, json.matchNumber);
    res.status(200).json({
      data: data
    }).end(); 
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ e })
    }
  }
})

// Gets all of the team performances for a specific match
app.post("/getMatch", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    matchNumber: z.number({
      required_error: "Match number is required"
    })
  })
})), async (req, res) => {
  try {
    const json = req.body;
    const data = await getMatch(json.tournamentName, json.matchNumber);
    res.status(200).json({
      data: data
    }).end(); 
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ e })
    }
  }
})

// Gets a specific team performance
app.post("/getTeamPerformance", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    matchNumber: z.number({
      required_error: "Match number is required"
    }),
    teamName: z.string({
      required_error: "Team Number is required"
    }),
  })
})), async (req, res) => {
  try {
    const json = req.body;
    const data = await getTeamPerformance(json.tournamentName, json.matchNumber, json.teamName);
    res.status(200).json({
      data: data
    }).end();
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ e })
    }
  }
})

// Gets the match numbers for a specific team
app.post("/getMatchNumbersForTeam", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    teamName: z.string({
      required_error: "Team name is required"
    }),
  })
})), async (req, res) => {
  try {
    const json = req.body;
    const data = await getMatchNumbersForTeam(json.tournamentName, json.teamName);
    res.status(200).json({
      data: data
    }).end(); 
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ e })
    }
  }
})

// Gets the names of teams involved in a specific match
app.post("/getTeamsInMatch", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    matchNumber: z.number({
      required_error: "Match number is required"
    })
  })
})), async (req, res) => {
  try {
    const json = req.body;
    const data = await getTeamsInMatch(json.tournamentName, json.matchNumber);
    res.status(200).json({
      data: data
    }).end(); 
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ e })
    }
  }
})

// Returns the number of team performances for a specific team in a specific match for a specific tournament
app.post("/getRecordsCount", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    matchNumber: z.number({
      required_error: "Match number is required"
    }),
    teamName: z.string({
      required_error: "Team name is required"
    })
  })
})), async (req, res) => {
  try {
    const json = req.body;
    const data = await getRecordsCount(json.tournamentName, json.matchNumber, json.teamName);
    res.status(200).json({
      data: data
    }).end(); 
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ e })
    }
  }
})

// Returns all the team performances for a specific team
app.post("/getMatchesWithTeam", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    teamName: z.string({
        required_error: "Team name is required"
    })
  })
  })), async (req, res) => {
    try {
      const json = req.body;
      const data = await getMatchesWithTeam(json.tournamentName, json.teamName);
      res.status(200).json({
        data: data
      }).end(); 
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ e })
      }
    }
})

app.post("/getMatchNumbers", validate(z.object({
  body: z.object({
    tournamentName: z.string({
        required_error: "Tournament name is required"
      }),
    })
  })), async (req, res) => {
    try {
      const json = req.body;
      const data = await getMatchNumbers(json.tournamentName);
      res.status(200).json({
        data: data
      }).end(); 
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ e })
      }
    }
  })

// Returns all of the team names in a given tournament
app.post("/getTeamNames", validate(z.object({
  body: z.object({
    tournamentName: z.string({
        required_error: "Tournament name is required"
      }),
    })
  })), async (req, res) => {
    try {
      const json = req.body;
      const data = await getTeamNames(json.tournamentName);
      res.status(200).json({
        data: data
      }).end(); 
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ e })
      }
    }
  })

// Returns the number of matches in a tournament
app.post("/getNumberOfMatches", validate(z.object({
  body: z.object({
    tournamentName: z.string({
        required_error: "Tournament name is required"
      }),
    })
  })), async (req, res) => {
    try {
      const json = req.body;
      const data = await getNumberOfMatches(json.tournamentName);
      res.status(200).json({
        data: data
      }).end(); 
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ e })
      }
    }
})

// Returns each numeric field
app.post("/getNumericFields", validate(z.object({
  body: z.object({
    tournamentName: z.string({
        required_error: "Tournament name is required"
      }),
    })
  })), async (req, res) => {
  try {
    const json = req.body
    const data = await getNumericFields(json.tournamentName)
    res.status(200).json({ data })
  } catch(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) res.status(400).json({ e })
  }
})

// Returns the maximum value present across all performances for each numeric field
app.post("/getSchemaMaxima", validate(z.object({
  body: z.object({
    tournamentName: z.string({
        required_error: "Tournament name is required"
      }),
    })
  })), async (req, res) => {
  try {
    const json = req.body
    const data = await getSchemaMaxima(json.tournamentName)
    res.status(200).json({ data })
  } catch(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) res.status(400).json({ e })
  }
})

// Returns the maximum value present across all performances for each numeric field
app.post("/getSchemaAverages", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
  })
})), async (req, res) => {
  try {
    const json = req.body
    const data = await getSchemaAverages(json.tournamentName)
    res.status(200).json({ data })
  } catch(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) res.status(400).json({ e })
  }
})

app.post("/getTeamOverview", validate(z.object({
  body: z.object({
    tournamentName: z.string({
      required_error: "Tournament name is required"
    }),
    teamName: z.string({
        required_error: "Team name is required"
      })
    })
  })), async (req, res) => {
  try {
    const json = req.body
    const data = await getTeamOverview(json.tournamentName, json.teamName)

    res.status(200).json({ data })
  } catch(e){
    if (e instanceof Prisma.PrismaClientKnownRequestError) res.status(400).json({ e })
  }
})

// TODO: zod
// Creates a new team performance
app.post("/putNewTeamPerformance", async (req, res) => {
  const json = req.body;
  await putNewTeamPerformance(json);
  console.log("The Bard's Song in the Forest by Blind Guardian and team performance added ", req.body);
  res.status(200).end();
})

app.get("/", async (req, res) => {
  res.send("Welcome to the scouting app backend")
})

app.listen(3000, () => {
  console.log("Hearts on Fire by Hammerfall and Server Started!"); 
}); 

module.exports = app;

/* 
TODO List:
  Handle errors for posting
  wrap with try catch and return json, add error variable to every response, maybe status code

  address todo at top of put new team performance
*/
