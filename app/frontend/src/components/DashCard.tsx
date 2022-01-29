import * as React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import useStyles from "../styles/Card.style";

function DashCard({ title, label, route }: DashCardProps): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography className={classes.cardTitle}>{title}</Typography>
        <Typography className={classes.cardLabel}>
          {label}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button className={classes.cardButton}>
          <Link className={classes.cardLink} to={route}>
            <ChevronRightIcon style={{ color: "rbga(0,0,0,0.2)" }} />
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default DashCard;
