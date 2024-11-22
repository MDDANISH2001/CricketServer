export interface IPlayer extends Document {
    playerId: string;
    name: string;
    teamId: string;
    role: "Batsman" | "Bowler" | "All-rounder" | "Wicketkeeper";
    stats: {
      batting: {
        runs: number;
        ballsFaced: number;
        fours: number;
        sixes: number;
        strikeRate: number;
      };
      bowling: {
        overs: number;
        maidens: number;
        runsConceded: number;
        wickets: number;
        noBalls: number;
        wides: number;
        economyRate: number;
      };
      fielding: {
        catches: number;
        stumpings: number;
      };
    };
  }