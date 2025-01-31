import React, { useState } from "react";
import {
  Typography,
  Container,
  CssBaseline,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";
import { ExpandMore, ChatOutlined, Send } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    padding: theme.spacing(4, 0),
    marginBottom: theme.spacing(8),
  },
  header: {
    textAlign: "center",
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  faqWrapper: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  faqContainer: {
    maxWidth: "800px",
    margin: "auto",
  },
  botButton: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  // Tornamos toda a área do bot mais clara, incluindo título e conteúdo
  chatDialog: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
    width: "300px",
    borderRadius: "12px",
    zIndex: 9999,
    backgroundColor: "#fafafa", // Fundo mais claro de toda a janelinha
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  chatInputContainer: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  chatInput: {
    flexGrow: 1,
  },
  // Classe para o Backdrop (caso queira mexer na cor ou opacidade)
  customBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const HelpPage = () => {
  const classes = useStyles();
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Como posso ajudar?" },
  ]);

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { sender: "user", text: message }]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Ainda estou aprendendo. Mas logo poderei ajudar mais!",
        },
      ]);
    }, 1000);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <CssBaseline />
        <Typography variant="h3" className={classes.header}>
          Central de Ajuda
        </Typography>

        <div className={classes.faqWrapper}>
          <div className={classes.faqContainer}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Como denunciar um problema?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Para denunciar um problema, vá até a aba "Denúncias" no menu
                  inferior, clique em "Nova Denúncia" e siga as instruções.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Como participar de eventos?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Acesse a seção "Eventos", escolha um evento de sua preferência e
                  clique em "Participar". Você receberá as informações por e-mail.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </Container>

      <IconButton className={classes.botButton} onClick={handleChatToggle}>
        <ChatOutlined fontSize="large" />
      </IconButton>

      <Dialog
        open={chatOpen}
        onClose={handleChatToggle}
        classes={{ paper: classes.chatDialog }}
        BackdropProps={{
          classes: {
            root: classes.customBackdrop,
          },
        }}
      >
        <DialogTitle>Bot de Ajuda</DialogTitle>
        <DialogContent className={classes.chatContainer}>
          {messages.map((msg, index) => (
            <Card
              key={index}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#e3f2fd" : "#f5f5f5",
              }}
            >
              <CardContent>
                <Typography>{msg.text}</Typography>
              </CardContent>
            </Card>
          ))}
          <div className={classes.chatInputContainer}>
            <TextField
              variant="outlined"
              size="small"
              className={classes.chatInput}
              placeholder="Digite sua dúvida..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <Send />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpPage;
