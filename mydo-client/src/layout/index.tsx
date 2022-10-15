import { useEffect } from 'react';
import { history } from 'umi';
import { Layout, Menu } from 'tdesign-react';
import { IconFont } from 'tdesign-icons-react';
import { initDB } from '@/utils';
import 'tdesign-react/es/style/index.css';
import styles from './index.less';
import logo from '@/assets/img/logo.png';

const { Header, Content } = Layout;
const { HeadMenu, MenuItem } = Menu;

export default function Main(props: any) {

	const buildMenu = () => {
		const { route = {} } = props;
		const { routes = [] } = route;
		return routes.map(({ path, title, icon }: { path: string, title: string, icon: string }) => {
			return (
				<MenuItem
					value={path}
					key={path}
					onClick={() => {
						if (props.location.pathname !== path) { 
							history.push(path);
						}
					}}
				>
					<IconFont name={icon} size="2em" />
					<span>{title}</span>
				</MenuItem>
			)
		})
	}

	useEffect(() => {
		initDB();
	}, [])

  return (
    <Layout>
      <Header>
        <HeadMenu
					value={props.location.pathname}
					logo={<img width="136" src={logo} alt="logo" />}
          operations={
            <div className="t-menu__operations">
							<IconFont name="search" size="2em" className="t-menu__operations-icon" />
							<IconFont name="notification" size="2em" className="t-menu__operations-icon" />
            </div>
          }
				>
					{buildMenu()}
        </HeadMenu>
      </Header>
			<Content className={styles.content}>
				{props.children}
      </Content>
    </Layout>
  );
}
