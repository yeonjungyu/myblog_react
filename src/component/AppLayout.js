import React, { useState } from 'react';
import { Layout, Menu, Modal, Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { Calendar } from 'antd';
import { Avatar } from 'antd'; // Avatar 컴포넌트 추가

const { Header, Content, Footer } = Layout;

// 팀원 리스트 데이터
const teamMembers = [
  { id: 1, name: '고요한' },
  { id: 2, name: '유연정' },
  { id: 3, name: '지상원' },
  { id: 4, name: '최주현' },
  { id: 5, name: '황나경' }
  // 추가 팀원 데이터 필요에 따라 여기에 추가
];

const items = [
  { key: 'main', label: '메인', path: '/' },
  { key: 'create', label: '글작성', path: '/createpost' },
  { key: 'list', label: '글목록', path: '/list' },
].map((item, index) => ({
  ...item,
  key: `${item.key}${index + 1}`,
}));

const AppLayout = ({ children }) => {
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [activeBreadcrumb, setActiveBreadcrumb] = useState('');

  // 달력 모달 열기
  const showModalCalendar = () => {
    setIsCalendarModalVisible(true);
    setActiveBreadcrumb('calendar');
  };

  // 달력 모달 닫기
  const handleCancelCalendar = () => {
    setIsCalendarModalVisible(false);
  };

  // 팀원 목록 모달 열기
  const showModalTeam = () => {
    setIsTeamModalVisible(true);
    setActiveBreadcrumb('team');
  };

  // 팀원 목록 모달 닫기
  const handleCancelTeam = () => {
    setIsTeamModalVisible(false);
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        >
          {items.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item
            style={{ color: activeBreadcrumb === '' ? 'black' : 'grey' }}
            onClick={() => setActiveBreadcrumb('')}
          >
            YJ's Blog
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{ color: activeBreadcrumb === 'calendar' ? 'black' : 'grey' }}
            onClick={showModalCalendar}
          >
            <CalendarOutlined /> 달력
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{ color: activeBreadcrumb === 'team' ? 'black' : 'grey' }}
            onClick={showModalTeam}
          >
            <TeamOutlined /> 팀원 목록
          </Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, minHeight: 280, background: '#fff' }}>
          {children}
        </div>
        
        {/* 달력 모달 */}
        <Modal
          title="달력"
          visible={isCalendarModalVisible}
          onCancel={handleCancelCalendar}
          footer={[
            <Button key="cancel" onClick={handleCancelCalendar}>
              닫기
            </Button>
          ]}
        >
          <Calendar fullscreen={false} />
        </Modal>

        {/* 팀원 목록 모달 */}
        <Modal
          title="팀원 목록"
          visible={isTeamModalVisible}
          onCancel={handleCancelTeam}
          footer={[
            <Button key="cancel" onClick={handleCancelTeam}>
              닫기
            </Button>
          ]}
        >
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {teamMembers.map(member => (
              <li key={member.id}>
                <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${member.name}`} />
                <span style={{ marginLeft: '10px' }}>{member.name}</span>
              </li>
            ))}
          </ul>
        </Modal>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AppLayout;
