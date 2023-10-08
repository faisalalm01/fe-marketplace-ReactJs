import React from 'react';
import SidebarUser from '../../components/sidebar/SidebarUser';
import Tabs from '../../components/tabs/Tabs';

const Pesanan = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-6 col-ml-6">
                        <SidebarUser/>
                    </div>
                    <div className="col-6 ">
                        <Tabs/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pesanan;