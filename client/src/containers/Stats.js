import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const renderList = list => list.map(item => (
  <TableRow>
    <TableRowColumn>{item.name}</TableRowColumn>
    <TableRowColumn>{item.errs}</TableRowColumn>
    <TableRowColumn>{item.correct}</TableRowColumn>
    <TableRowColumn>{item.drinks}</TableRowColumn>
  </TableRow>
))

class Stats extends Component {
  state = {
    list: [],
  }

  componentWillMount () {
    this.getStats()
  }

  getStats = async () => {
    let res = await fetch('/api/team')
    res = await res.json()
    console.log(res)
    this.setState({ list: res.teams })
  }

  render () {
    return (
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
    )
  }
}

export default Stats
