import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { questions, checkAnswer, questObj } from "./assets/questions/questions";
import back from "./assets/back.png";
import { useEffect, useState } from "react";
function App() {
  // ============states============
  const [inputAns, setInputAns] = useState("");
  const [appState, setAppState] = useState({
    questionsLeft: [],
    score: 0,
    wrong: 0,
    qnsAnswered: 0,
    questionToAns: {
      index: 0,
      question: "",
      answer: "",
      image: "",
    },
  });

  // ======function during mounting===========
  function start() {
    const qnNumberIndex = Math.floor(Math.random() * questions.length);
    setAppState((pre) => ({
      ...pre,
      questionsLeft: questions,
      questionToAns: questObj(qnNumberIndex, questions),
    }));
  }

  // =================button click handler function =========
  const handleClick = () => {
    {
      if (inputAns.length < 3) return;
      const { remainingQn, qnAnswered, nextQuestion, scored, wronged, done } =
        checkAnswer(
          appState.questionToAns,
          appState.questionsLeft,
          appState.score,
          inputAns,
          appState.qnsAnswered,
          appState.wrong
        );
      setInputAns("");
      setAppState((pre) => ({
        ...pre,
        wrong: wronged,
        questionsLeft: remainingQn,
        score: scored,
        qnsAnswered: qnAnswered,
        questionToAns: nextQuestion,
      }));
      if (done) {
        alert(
          "Done with questions, you had " +
            scored +
            " out of " +
            qnAnswered +
            " tries"
        );
        setAppState((pre) => ({ ...pre, score: 0, wrong: 0, qnsAnswered: 0 }));
      }
    }
  };

  // =========Sets questions after mounting==========
  useEffect(() => {
    start();
  }, []);

  // =============enter button listener ===========
  useEffect(() => {
    function handlePress(e) {
      if (e.keyCode === 13) {
        handleClick();
      }
    }
    document.body.addEventListener("keypress", handlePress);
    return () => document.body.removeEventListener("keypress", handlePress);
  }, [appState, inputAns]);
  return (
    <Grid
      container
      maxWidth={"1920px"}
      bgcolor={"#ff6700"}
      height={"100vh"}
      p={{ md: "2em 2em", xs: "1em" }}
      sx={{ overflowY: "scroll" }}
      alignItems={"flex-start"}
      gap={2}
      flexDirection={"column"}
      flexWrap={"nowrap"}
    >
      <Container
        sx={{
          display: "flex",
          height: { xs: "50px", md: "72px" },
          alignItems: "center",
          gap: ".5em",
          justifyContent: "center",
          flexWrap: "nowrap",
        }}
        width={{ xs: "348px", md: "500px" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            height: { xs: "40px", md: "52px" },
            width: { xs: "40px", md: "52px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            borderRadius: "50%",
            color: "#ff6700",
          }}
        >
          <TiShoppingCart />
        </Box>
        <Typography
          color={"white"}
          component={"h3"}
          variant="body"
          fontSize={{ xs: "2.2rem", md: "4rem" }}
        >
          <span style={{ fontWeight: "100" }}>WEB</span>ORIGO
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: { md: "1em 0", xs: ".4em" },
          gap: ".5em",
          bgcolor: "white",
          backgroundImage: `url(${back})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: { md: "12px", xs: "30px" },
          backgroundSize: { md: "60%", xs: 0 },
        }}
        maxWidth={"lg"}
      >
        <Container
          disableGutters
          sx={{
            display: { md: "none", xs: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: "4em",
            pt: 1,
            px: 1,
            mb: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".3em",
              fontSize: { md: "2rem", xs: "1.6rem" },
              color: "#ff6700",
            }}
          >
            <AiOutlineLike />
            <Typography fontSize={{ md: "1.3rem", xs: "1rem" }}>
              {appState.score}/{appState.qnsAnswered}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".3em",
              fontSize: { md: "2rem", xs: "1.6rem" },
              color: "#ff6700",
            }}
          >
            <BiDislike />{" "}
            <Typography fontSize={{ md: "1.3rem", xs: "1rem" }}>
              {appState.wrong}/{appState.qnsAnswered}
            </Typography>
          </Box>
        </Container>

        <img
          className={"demo__image"}
          src={appState.questionToAns.image}
          alt="devImage"
        />
        <Typography
          fontSize={{ md: "1.44rem" }}
          fontWeight={"500"}
          color={"black"}
          variant="body"
        >
          {appState.questionToAns.question}
        </Typography>
        <input
          aria-valuemin={2}
          minLength={2}
          value={inputAns}
          onInput={(e) => setInputAns(e.target.value)}
          placeholder="Enter answer"
          type="text"
          className="my__input"
        />
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: "#ff6700",
            color: "white",
            textTransform: "initial",
            fontWeight: "700",
            width: "80%",
            maxWidth: "250px",
            "&:hover": {
              backgroundColor: "white",
              color: "#ff6700",
              border: "00.3px solid #ff6700",
            },
            padding: ".5em 0",
            fontSize: "1rem",
            mt: { md: 3, xs: 2 },
            mb: { md: 0, xs: 1 },
          }}
        >
          Let's see{" "}
        </Button>
        <Container
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
            alignItems: "center",
            gap: "4em",
            mt: 2,
            px: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".3em",
              fontSize: { md: "2rem", xs: "1.6rem" },
              color: "#ff6700",
            }}
          >
            <AiOutlineLike />
            <Typography fontSize={{ md: "1.3rem", xs: "1rem" }}>
              {appState.score}/{appState.qnsAnswered}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".3em",
              fontSize: { md: "2rem", xs: "1.6rem" },
              color: "#ff6700",
            }}
          >
            <BiDislike />{" "}
            <Typography fontSize={{ md: "1.3rem", xs: "1rem" }}>
              {appState.wrong}/{appState.qnsAnswered}
            </Typography>
          </Box>
        </Container>
      </Container>
    </Grid>
  );
}

export default App;
