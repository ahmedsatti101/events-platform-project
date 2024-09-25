import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Grid from "@mui/material/Grid";
import "./Events.css";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function ViewAllEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "events");
        const snapshot = await getDocs(colRef);
        const data: any[] = [];

        snapshot.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        setEvents(data);
      } catch (error) {
        alert("Something went wrong.");
      }
    };

    fetchData().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleExpandClick = (id: number) => {
    setExpanded((expanded: any) => ({
      ...expanded,
      [id]: !expanded[id],
    }));
  };

  return (
    <>
      {events.map((event) => {
        return (
          <Card key={event.id} id="event-card" data-testid="events">
            <CardHeader
              title={event.title}
              subheader={`Starting at ${event.startTime} on ${event.date}`}
              id="event-header"
            />
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item>
                <LocationOnOutlinedIcon />
              </Grid>
              <Grid item>
                <CardContent id="event-location">{event.location}</CardContent>
              </Grid>
            </Grid>
            <CardActions id="event-actions">
              <div
                data-testid="expand-more-icon"
                onClick={() => handleExpandClick(event.id)}
                aria-label="show more"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ExpandMoreIcon />
              </div>
              <p>Learn more</p>
              <Button variant="contained" id="sign-up-button" href={`events/${event.id}`}>
                Sign up
              </Button>
            </CardActions>
            <Collapse in={expanded[event.id]} timeout="auto" unmountOnExit>
              <CardContent className="event-info">
                <Typography paragraph>Description</Typography>
                <Typography paragraph id="event-description">
                  {event.description}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </>
  );
}
