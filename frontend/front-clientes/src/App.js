import React, {Component} from 'react';
import $ from 'jquery';

export default class App extends Component {

  onFormSubmitSuccess(e) {

    $.ajax({
      url: 'http://localhost/newmConexao/listar.php',
      type: "GET",
      dataType: "json",
      success: function(data) {
        console.log('success');
    console.log(data); // will print "message"
  }.bind(this),
  error: function(xhr, status, err) {
    console.log('error');
  }.bind(this)
});
  }

  render(){

    return (
      <div className="App">
        <button onClick={this.onFormSubmitSuccess.bind(this)} >click here</button>
      </div>
      );
  }
}
