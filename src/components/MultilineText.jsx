import React from 'react';
import Typography from '@material-ui/core/Typography';

class MultilineText extends React.Component {
  state = {
      text: ""
  }

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.setState({
      text: this.props.text
    })
  }
  

  render() {
    const {text} = this.state;
    return (
        String(text).split("\n").map(line => {
            return <Typography>{line}</Typography>
        })
    );
  }
  
}

export default MultilineText;