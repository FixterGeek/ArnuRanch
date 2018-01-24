import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Modal} from 'antd';
import ProveedorForm from './ProveedorForm';
import * as proveedoresActions from '../../redux/actions/proveedoresActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

const columns = [
    {
        title: 'PROVEEDOR',
        dataIndex: 'provider',
    },
    {
        title: 'DIRECCIÓN',
        dataIndex: 'address',
    },
    {
      title: 'E-MAIL',
        dataIndex: 'email'
    },
    {
        title: 'ACTION5',
        key: 'action',
        render: (text, record) => (
            <span>
              <Link to={`/admin/proveedores/${record.id}`}>Detalle</Link>
            </span>
        ),
    }
];



const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

class ProovedorPage extends Component {

    state = {
        ModalText: <ProveedorForm saveProveedor={this.props.proveedoresActions.saveProveedor}/>,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const { visible, ModalText } = this.state;
        let {proveedores} = this.props;
        return (
            <Fragment>
                <h1>Proveedores</h1>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={proveedores}
                    rowKey={record => record.id}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Nuevo Proveedor"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    {ModalText}
                </Modal>
               </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        proveedores:state.proveedores.list,
        //fetched:state.proveedores.list!==undefined &&state.proveedores.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        proveedoresActions:bindActionCreators(proveedoresActions, dispatch)
    }
}

ProovedorPage = connect(mapStateToProps,mapDispatchToProps)(ProovedorPage);
export default ProovedorPage;