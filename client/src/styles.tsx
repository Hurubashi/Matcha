import { createStyles } from "@material-ui/core"

const styles = createStyles({
  h1: {
    marginTop: "0.5em",
    fontWeight: 400,
    fontSize: "3.5em"
  },
  light: {
    color: "white"
  },

  text: {
    width: 400
  },

  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    marginTop: '2em',

  },
  gridList: {
    width: 600,
    height: 400
  }, 

  icon: {
    color: 'white',
  },

  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
})

export default styles
