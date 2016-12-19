import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import HomePageSection from './generic-section';
import ProjectIcon from '../../components/project-icon';

class RecentProjectsSection extends Component {
  constructor(props) {
    super(props);
    this.toggleAllProjects = this.toggleAllProjects.bind(this);
    this.state = {
      allProjects: false,
    };
  }
  
  componentDidUpdate() {
    !this.state.allProjects && ReactDOM.findDOMNode(this).scrollIntoView();
  }

  toggleAllProjects() {
    this.setState({
      allProjects: !this.state.allProjects,
    });
  }

  render() {
    const { onClose, updatedProjects } = this.props;
    const visibleProjects = updatedProjects.slice(0, 4);
    const hiddenProjects = updatedProjects.slice(4);
    const className = this.state.allProjects ? 'open' : 'closed'
    return (
      <HomePageSection
        title="Recent projects"
        onClose={onClose}
      >
        {(updatedProjects === 0)
        ? <div className="home-page-section__header-label">
            <p> You have no recent projects. </p>
          </div>
        : <div  className="project-card-list">
            <span>
            {visibleProjects.map((project) => {
              return (
                <span key={project.id}>
                  <ProjectIcon project={project} badge={project.classifications} />
                  &ensp;
                </span>
              );
            })}
            </span>
            <span className={className}>
            {hiddenProjects.map((project) => {
              return (
                <span key={project.id}>
                  <ProjectIcon project={project} badge={project.classifications} />
                  &ensp;
                </span>
              );
            })}
            </span>
        </div>}
        <button type="button" className="outlined-button" onClick={this.toggleAllProjects}>
          <span className="home-page-section__header-label">
            See all
            <br />
            <i className={this.state.allProjects ? "fa fa-chevron-up" : "fa fa-chevron-down"}></i>
          </span>
        </button>
      </HomePageSection>
    );
  }
}

RecentProjectsSection.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  projects: React.PropTypes.array.isRequired,
  updatedProjects: React.PropTypes.array.isRequired,
};

RecentProjectsSection.defaultProps = {
  onClose: () => {},
  projects: [],
  updatedProjects: [],
};

export default RecentProjectsSection;
