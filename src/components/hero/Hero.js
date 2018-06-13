import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { TimelineLite } from 'gsap';
import { add } from 'gsap-tools';

import Circles from './Circles';
import Logo from './Logo';
import AppleGuy from './AppleGuy';

import './Hero.css';

export default class Hero extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  componentDidMount() {
    setTimeout(this.animate, 1000);
  }

  componentWillUnmount() {
    this.disposer1();
    // this.disposer2();
    // this.disposer3();
    // this.disposer4();
  }

  animate = () => {
    const mainTimeline = new TimelineLite({ id: 'Everything' });
    const circlesTimeline = new TimelineLite({ id: 'Circles' });
    const logoTimeline = new TimelineLite({ id: 'Logo' });
    const appleTimeline = new TimelineLite({ id: 'Apple Guy' });

    mainTimeline.addLabel('start');

    // get external timelines
    circlesTimeline.add(this.circles.timelineEnter).add(this.circles.timelineLeave);
    logoTimeline.add(this.logo.timelineEnter).add(this.logo.timelineLeave, '+=0.75');
    appleTimeline.add(this.apple.timelineEnter);

    mainTimeline
      .add(circlesTimeline, 'start')
      .add(logoTimeline, 'start')
      .add(appleTimeline, logoTimeline.duration());

    this.disposer1 = add(mainTimeline);
    // this.disposer2 = add(circlesTimeline);
    // this.disposer3 = add(logoTimeline);
    // this.disposer4 = add(appleTimeline);
  }

  render() {
    const { children } = this.props;

    return (
      <div className="hero">
        <div className="hero__inner">
          <Circles ref={(el) => { this.circles = el; }} />
          <Logo ref={(el) => { this.logo = el; }} />
          <AppleGuy ref={(el) => { this.apple = el; }} />
          {children}
        </div>
      </div>
    );
  }
}