import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './style';

const CompareList = ({ repositories }) => (
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
            <i className="fas fa-code-branch" />
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            <i className="fa exclamation-triangle" />
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            <i className="fas fa-exclamation-circle" />
            {repository.lastCommit} <small>last commit</small>
          </li>
          <li>
            <i className="far fa-arrow-alt-circle-down" />
            {repository.lastUpdate} <small>last update in GitCompare</small>
          </li>
        </ul>
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
};

export default CompareList;
