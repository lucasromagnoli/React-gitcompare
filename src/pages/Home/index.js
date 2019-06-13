import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/logo.png';
import { Form, Container } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Home extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({ repositories: await this.getLocalRepositories(), loading: false });
  }

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('@GitCompare:repositories')) || [];

  handleRemoveRepository = async (id) => {
    const repositoriesFiltred = this.state.repositories.filter(repo => repo.id !== id);
    this.setState({ repositories: repositoriesFiltred });

    await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositoriesFiltred));
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);
    try {
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      repository.lastUpdate = Date.now();

      this.setState({
        repositoryError: false,
        repositories: repositories.map(repo => (repo.id === repository.id ? repository : repo)),
      });

      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositories));
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      const { repositories } = this.state;
      const alreadyPushed = repositories.map(repo => repo.id).indexOf(repository.id);
      if (alreadyPushed > -1) {
        this.setState({ repositoryError: true });
        return;
      }
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      repository.lastUpdate = Date.now();

      await localStorage.setItem(
        '@GitCompare:repositories',
        JSON.stringify([...this.state.repositories, repository]),
      );

      this.setState({
        repositoryInput: '',
        repositoryError: false,
        repositories: [...this.state.repositories, repository],
      });
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          removeRepository={this.handleRemoveRepository}
          updateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}
