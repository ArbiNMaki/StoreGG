import Footer from "./Footer";
import Profile from "./Profile";
import MenuItem from "./MenuItem";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface SidebarProps {
    activeMenu: "overview" | "transactions" | "settings";
}

export default function Sidebar(props: SidebarProps) {
    const { activeMenu } = props;
    const router = useRouter();

    const onLogout = () => {
        Cookies.remove('token');
        router.push('/sign-in');
    }
    return (
        <>
            <section className="sidebar">
                <div className="content pt-50 pb-30 ps-30">
                    <Profile />
                    <div className="menus">
                        <MenuItem
                            title="Overview"
                            icon="icon-menuitem-overview"
                            active={activeMenu === "overview"}
                            href="/member"
                        />
                        <MenuItem
                            title="Transaction"
                            icon="icon-menuitem-transaction"
                            active={activeMenu === "transactions"}
                            href="/member/transactions"
                        />
                        <MenuItem title="Card" icon="icon-menuitem-card" href="/member" />
                        <MenuItem
                            title="Rewards"
                            icon="icon-menuitem-reward"
                            href="/member"
                        />
                        <MenuItem
                            title="Message"
                            icon="icon-menuitem-message"
                            href="/member"
                        />
                        <MenuItem
                            title="Settings"
                            icon="icon-menuitem-setting"
                            active={activeMenu === "settings"}
                            href="/member/edit-profile"
                        />
                        <MenuItem
                            title="Log Out"
                            icon="icon-menuitem-logout"
                            onClick={onLogout}
                        />
                    </div>
                    <Footer />
                </div>
            </section>
        </>
    );
}
