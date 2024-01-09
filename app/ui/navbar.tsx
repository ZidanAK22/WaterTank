import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

const MyNavbar = () => {
    return (
        <nav className={styles.navbar}>            
            <div className="flex flex-row justify-evenly">
                <Link href="/">
                    Home
                </Link>        
                <Image src="/water-tank.svg" alt="Brand" height={64} width={64} className="rounded-full"/>
                <Link href="/mqtt">
                    MQTT
                </Link>                
            </div>        
        </nav>
    )
}

export default MyNavbar;