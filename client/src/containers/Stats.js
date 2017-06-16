import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class Stats extends Component {
  constructor () {
    super()
    this.state = {
      list: []
    }
    this.getStats = this.getStats.bind(this)
  }

  componentWillMount () {
    this.getStats()
  }

  async getStats () {
    let res = await fetch('/api/team')
    res = await res.json()
    console.log(res)
    this.setState({ list: res.teams })
  }

  renderList (list) {
    return list.map(item => (
      <TableRow>
        <TableRowColumn>
          { item.name }
        </TableRowColumn>
        <TableRowColumn>
          { item.errs }
        </TableRowColumn>
        <TableRowColumn>
          { item.correct }
        </TableRowColumn>
        <TableRowColumn>
          { item.drinks }
        </TableRowColumn>
      </TableRow>
    ))
  }

  render() {
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
        <TableBody>
          {
            this.renderList(this.state.list)
          }
        </TableBody>
      </Table>
    )
  }
}


export default Stats


