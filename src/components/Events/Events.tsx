import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Grid from "@mui/material/Grid";
import "./Events.css";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "../../firebase";

export default function ViewAllEvents() {
  const [events, setEvents] = useState<any[]>();
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const command = new ScanCommand({TableName: "events"});
        const res = await dbClient.send(command)
        setEvents(res.Items)
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
      {events?.map((event) => {
        return (
          <Card key={event.eventId.S} id="event-card" data-testid="events">
            <CardHeader
              title={event.title.S}
              subheader={`Starting at ${event.startTime.S} on ${event.date.S}`}
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
                <CardContent id="event-location">{event.location.S}</CardContent>
              </Grid>
            </Grid>
            <CardActions id="event-actions">
              <div
                data-testid="expand-more-icon"
                onClick={() => handleExpandClick(event.eventId.S)}
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
              <Button variant="contained" id="sign-up-button" href={`events/${event.eventId.S}`}>
                Sign up
              </Button>
            </CardActions>
            <Collapse in={expanded[event.eventId.S]} timeout="auto" unmountOnExit>
              <CardContent className="event-info">
                <Typography paragraph>Description</Typography>
                <Typography paragraph id="event-description">
                  {event.description.S}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </>
  );
}
