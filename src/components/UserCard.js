import React, {useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
      width: 345,
      marginTop: `50px`,
      backgroundColor: `#F2F2F2`,
    },
    media: {
      height: `150px`,
      width: 345,
      paddingTop: '56.25%', // 16:9
    },
  
  }));



function UserCard(props){
    const classes = useStyles();
    const { user } = props;
    useEffect(() =>{
        console.log(user);
    }, [user]);

    return(
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="User photograph avatar" src={props.user.avatar_url} className={classes.avatar}>
                        R
                    </Avatar>
                }
                title={`Username: ${props.user.login}`}
            />
            <CardMedia
                className={classes.media}
                title="User photograph"
                image={props.user.avatar_url}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Website: {props.user.url}
                </Typography>
            </CardContent>
        </Card>
    );
};


export default UserCard;