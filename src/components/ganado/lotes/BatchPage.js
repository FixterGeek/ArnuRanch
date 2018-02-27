import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Table, Button, Modal, Input, Divider, message} from 'antd';
import * as lotesActions from '../../../redux/actions/lotesActions';
import {bindActionCreators} from "redux";
import BatchForm from './BatchForm';
import MainLoader from "../../common/Main Loader";

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key:'name',
        render:(text, record)=>  <Link to={`/admin/lotes/${record.id}`} >{text}</Link>,

        width:150

    },
    {
        title: 'Status',
        dataIndex: 'status',
        key:'status',
        render: val => <p>{val?'Activo':'Inactivo'}</p>,
        width:100
    },
    {
        title: 'Corral ',
        dataIndex: 'corral',
        key:'corral',
        render:val => <p>{val?val.no_corral:'No asignado'}</p>,
        width:150
    },
    {
        title: 'No. de Aretes',
        dataIndex:'animals',
        key:'animals',
        render:val=><p>{val?val.length:0}</p>,
        width:100
    },
    /*{
        title: 'Ac',
        dataIndex: 'id',
        render: text => <Link to={`/admin/lotes/${text}`} >Detalle</Link>,
    },*/
];



const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

class BatchPage extends Component {
    state = {
        visible: false,
        searchText:'',
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

    saveLote=(lote)=>{
        this.props.loteActions.saveLote(lote)
            .then(r=>{
                message.success('lote creado con éxito');
                this.handleCancel()
            }).catch(e=>{
            for (let i in e.response.data){
                message.error(e.response.data[i])
            }
        })
    };

    handleSearch=(e)=>{
        this.setState({searchText:e.target.value})
    };
    onSearch=()=>{
        //let basePath = 'http://localhost:8000/api/ganado/lotes/?q=';
        let basePath = 'http://54.201.124.163/api/ganado/lotes/?q=';
        let url = basePath+this.state.searchText;
        this.props.loteActions.getLotes(url)
    };
    resetFilters=()=>{
        //let basePath = 'http://localhost:8000/api/ganado/lotes/';
        let basePath = 'http://54.201.124.163/.herokuapp.com/api/ganado/lotes/';
        this.props.loteActions.getLotes(basePath);
        this.setState({searchText:''});
    };
    handlePagination=(pagina)=>{

        let newUrl = this.props.paginationData.next;
        let nextLength = pagina.toString().length;
        if(newUrl!==null){
            newUrl=newUrl.slice(0,newUrl.length-nextLength);
            newUrl=newUrl+pagina;
            this.props.loteActions.getLotes(newUrl);

        }else{
            newUrl = this.props.paginationData.previous;
            this.props.loteActions.getLotes(newUrl);

        }

    };

    render() {
        const { visible , searchText} = this.state;
        let {lotes, fetched, corrales, paginationData} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h2>Listado de Lotes</h2>
                {/*Search and filters*/}
                <div style={{padding:'1% 0'}}>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 400 }}
                        placeholder={'Busca por nombre'}/>
                    <Divider
                        type={'vertical'}/>
                    {/*<Select
                        value={loteFilter}
                        mode="combobox"
                        style={{ width: 200 }}
                        onChange={this.handleChange}
                        onSelect={this.filterByLote}
                        placeholder="Filtra por nombre de lote"
                        filterOption={false}
                    >
                        {options}
                    </Select>
                    <Divider
                        type={'vertical'}/>*/}
                    <Button type="primary" onClick={this.resetFilters}>Restablecer</Button>
                </div>
                <Table

                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={lotes}
                    rowKey={record => record.id}
                    pagination={{
                        pageSize:10,
                        total:paginationData.count,
                        onChange:this.handlePagination}}
                    scroll={{x:650, y:500}}
                />


                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <Modal title="Nuevo Lote"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <BatchForm corrales={corrales} saveLote={this.saveLote}/>
                </Modal>
            </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        lotes:state.lotes.list,
        corrales:state.corrales.list,
        paginationData:state.lotes.allData,
        fetched:state.lotes.list!==undefined && state.corrales.list!==undefined && state.lotes.allData!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loteActions:bindActionCreators(lotesActions, dispatch)
    }
}

BatchPage = connect(mapStateToProps,mapDispatchToProps)(BatchPage);
export default BatchPage;

