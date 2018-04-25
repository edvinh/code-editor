import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Snackbar from 'material-ui/Snackbar'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import * as socketActions from '../actions/socketActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { listTeams } from '../actions/api/'
import speak from 'browser-speak'

const speechIndex = 4

const containerStyle = {
  textAlign: 'center',
  margin: '150px auto',
  width: '100%',
}

const renderList = list =>
  list.map(item => (
    <TableRow key={item._id}>
      <TableRowColumn>{item.name}</TableRowColumn>
      <TableRowColumn>{item.errs}</TableRowColumn>
      <TableRowColumn>{item.correct || 'Not Implemented'}</TableRowColumn>
      <TableRowColumn>{item.drinks}</TableRowColumn>
    </TableRow>
  ))

const updateList = (list, team) => {
  const index = list.findIndex(el => el._id === team._id)
  const newList = [...list]
  newList[index] = team
  return newList
}

class Stats extends Component {
  state = {
    list: [],
    error: false,
    loading: true,
    message: '',
  }

  componentWillMount () {
    this.getStats()

    this.props.subscribeToJoin((team) => {
      speak(`Team ${team.name} joined`, speechIndex)
      this.setState({
        message: `Team ${team.name} joined`,
        list: [...this.state.list, team],
      })
    })

    this.props.subscribeToCompileError((team) => {
      speak(`Team ${team.name}: Compile error`, speechIndex)
      const newList = updateList(this.state.list, team)
      this.setState({
        message: `Team ${team.name}: Compile error`,
        list: newList,
      })
    })

    this.props.subscribeToBeverageFinish((team) => {
      speak(`Team ${team.name} finished their beverage`, speechIndex)
      const newList = updateList(this.state.list, team)
      this.setState({
        message: `Team ${team.name} finished their beverage!`,
        list: newList,
      })
    })
  }

  getStats = async () => {
    this.setState({ loading: true, error: false })
    try {
      let res = await listTeams()
      res = await res.json()
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
        <Snackbar
          open={!!this.state.message}
          message={this.state.message}
          onRequestClose={() => this.setState({ message: '' })}
          autoHideDuration={4000}
        />
      </React.Fragment>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...socketActions }, dispatch)
}

export default connect(null, mapDispatchToProps)(Stats)
