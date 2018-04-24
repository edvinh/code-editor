import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const containerStyle = {
  textAlign: 'center',
  margin: '150px auto',
  width: '100%',
}

const renderList = list =>
  list.map(item => (
    <TableRow>
      <TableRowColumn>{item.name}</TableRowColumn>
      <TableRowColumn>{item.errs}</TableRowColumn>
      <TableRowColumn>{item.correct || 'Not Implemented'}</TableRowColumn>
      <TableRowColumn>{item.drinks}</TableRowColumn>
    </TableRow>
  ))

class Stats extends Component {
  state = {
    list: [],
    error: false,
    loading: true,
  }

  componentWillMount () {
    this.getStats()
  }

  getStats = async () => {
    this.setState({ loading: true, error: false })
    try {
      let res = await fetch('/api/team')
      res = await res.json()
      console.log(res)
      this.setState({ list: res.teams, error: false, loading: false })
    } catch (err) {
      this.setState({ error: true, loading: false })
    }
  }

  render () {
    return (
      <React.Fragment>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Team</TableHeaderColumn>
              <TableHeaderColumn>Compiler Errors</TableHeaderColumn>
              <TableHeaderColumn>Correct Tasks</TableHeaderColumn>
              <TableHeaderColumn>Finished Beverages</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>{renderList(this.state.list)}</TableBody>
        </Table>
        {this.state.error && (
          <div style={containerStyle}>
            <h1>Server error :(</h1>
            <br />
            <FlatButton icon={<Refresh />} label="Try Again" onClick={this.getStats} />
          </div>
        )}
        {this.state.loading && (
          <div style={containerStyle}>
            <CircularProgress />
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default Stats
