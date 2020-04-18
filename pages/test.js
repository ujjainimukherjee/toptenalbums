
import React, { Component } from 'react'
import axios from 'axios';

class TestPage extends React.Component {
  static async getInitialProps(ctx) {
      try {
          const axioscfg=ctx.req?{baseURL:'http://localhost:3000'}:{}
          const response = await axios.get('/api/test', axioscfg);
          return {title: response.data.test}
      } catch (error) {
          console.log(error);
          return {title: 'not okay'}
      }
  }

  render () {
    return (
      <div>
        <div>
          {this.props.title}
        </div>
      </div>
    )
  }
}

export default TestPage;
