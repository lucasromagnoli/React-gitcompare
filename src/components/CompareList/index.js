import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Repository } from './style';

const CompareList = ({ repositories, removeRepository, updateRepository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={`${repository.owner.login} logo`} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            <i className="fa fa-star" />
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            <i className="fa fa-code-fork" />
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            <i className="fa fa-exclamation-circle" />
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            <i className="fa fa-clock-o" />
            {repository.lastCommit} <small>last commit</small>
          </li>
          <li>
            <i className="fa fa-refresh" />
            {moment(repository.lastUpdate).fromNow()} <small>last update in GitCompare</small>
          </li>
        </ul>
        <div className="buttons-container">
          <button type="button" onClick={() => updateRepository(repository.id)}>
            <i className="fa fa-refresh" />
          </button>
          <button type="button" onClick={() => removeRepository(repository.id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  updateRepository: PropTypes.func.isRequired,
  removeRepository: PropTypes.func.isRequired,
};

export default CompareList;
