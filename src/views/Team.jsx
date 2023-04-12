import { useNavigate } from 'react-router-dom';
import React from 'react';
import arrow from '../assets/left-arrow.png';
import Footer from '../components/Footer/Footer';
import './Team.css';

const Team = () => {
  const navigate = useNavigate();
  const teamMember = [
    {
      member_id: 0,
      name: 'Weidong Fang',
      email: 'fangweidong1985@gmail.com',
      linkedin: 'https://www.linkedin.com/in/weidong-ryan/',
    },
    {
      member_id: 1,
      name: 'Jiawei Li',
      email: 'jiaweiaaagaga@gmail.com',
      linkedin: 'https://www.linkedin.com/in/jiawei-li-au/',
    },
    {
      member_id: 2,
      name: 'Yuejun Sun',
      email: 'sunyuejun8623@gmail.com',
      linkedin: 'https://www.linkedin.com/in/yuejun-sun-a13b99152/',
    },
    {
      member_id: 3,
      name: 'Felix Liu',
      email: 'felix_liu03@hotmail.com',
      linkedin: 'https://www.linkedin.com/in/felix-mj-liu/',
    },
    {
      member_id: 4,
      name: 'Liuqing Yang',
      email: 'liuqingyang000@gmail.com',
      linkedin: 'linkedin.com/in/liuqing-yang-460b67192',
    },
    {
      member_id: 5,
      name: 'Eric Liu',
      email: 'ericliu940430@gmail.com',
      linkedin: 'https://www.linkedin.com/in/teng-eric-liu-10bb55246',
    },
  ];
  const devops = [
    {
      member_id: 0,
      name: 'Cassie Chen',
      email: 'cassie.jchen@gmail.com',
      linkedin: 'https://www.linkedin.com/in/cassie-jchen',
    },
    {
      member_id: 1,
      name: 'Shawn Wang',
      email: 'tremendous.shawn.wang@outlook.com',
      linkedin: 'https://www.linkedin.com/in/tremendous-shawn-wang/',
    },
    {
      member_id: 2,
      name: 'James Liu',
      email: 'jamessihang@hotmail.com',
      linkedin: ' https://www.linkedin.com/in/james-shl/',
    },
    {
      member_id: 3,
      name: 'Xiaobo Guo',
      email: 'gxbyunyun@gmail.com',
      linkedin: 'www.linkedin.com/in/xiaobo-guo/',
    },
    {
      member_id: 4,
      name: 'Jeannie Chi',
      email: 'quanjingqing@gmail.com',
      linkedin: 'https://www.linkedin.com/in/jeannie-c',
    },
  ];

  const btnClickHandler = () => {
    navigate(-1);
  };
  return (
    <div className="teamBox">
      <div className="headerBox">
        <div className="connect-title-line">
          <div className="btn btn-back" onClick={btnClickHandler}>
            <img src={arrow} alt="left-arrow" />
          </div>
          <div className="usernameBox">
            <p className="webname">Our Team</p>
          </div>
        </div>
      </div>
      <div className="contentBox">
        <div className="title">Tutor</div>
        <table className="query-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Linkedin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>email</td>
              <td>linkedin</td>
            </tr>
          </tbody>
        </table>
        <div className="title">Developers</div>
        <table className="query-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Linkedin</th>
            </tr>
          </thead>
          <tbody>
            {teamMember &&
              teamMember.map((member) => (
                <tr key={member.member_id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.linkedin}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="title">Data Analyst</div>
        <table className="query-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Linkedin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Jia Ji</th>
              <th>jasmineszdx@gmail.com</th>
              <th> </th>
            </tr>
          </tbody>
        </table>
        <div className="title">Devops</div>
        <table className="query-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Linkedin</th>
            </tr>
          </thead>
          <tbody>
            {devops &&
              devops.map((member) => (
                <tr key={member.member_id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.linkedin}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="addBottom"> </div>
      <Footer />
    </div>
  );
};

export default Team;
