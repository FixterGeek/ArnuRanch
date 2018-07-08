import React from 'react';
import { Form, Input, Button, Modal,DatePicker,InputNumber  } from 'antd';
import moment from 'moment';


const FormItem = Form.Item;

const styles = {
    form:{
        display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap'

    },
    formSection:{
        display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'
    },
    sectionCheck:{
        display:'flex',justifyContent:'flex-end', flexWrap:'wrap'
    },
    buttonSave:{
        borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'
    }
};


const CatalogoForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form,activeTab} = props;
        const{getFieldDecorator} = form;


        return(
            <Modal
                visible={visible}
                title={"Agregar a Catálogo"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >
                <Form onSubmit={onCreate} >
                    <div style={styles.form}>
                        <FormItem
                            label="Nombre"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input  />
                            )}
                        </FormItem>

                        <FormItem
                            label="Código"
                        >
                            {getFieldDecorator('code', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input />
                            )}
                        </FormItem>
                        {activeTab === "budget" ?
                            <div>
                                <FormItem
                                    label="Concepto"
                                >
                                    {getFieldDecorator('concept', {
                                        rules: [{
                                            required: true, message: 'Completa el campo!',
                                        }],

                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Monto"

                                >
                                    {getFieldDecorator('monto', {
                                        initialValue:0,
                                        rules: [{
                                            required:true
                                        }],
                                    })(
                                        <InputNumber
                                            style={{width:'100%'}}
                                            step={0.01}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Fecha"
                                >
                                    {getFieldDecorator('date', {
                                        initialValue:moment( new Date(), 'YYYY-MM-DD'),
                                        rules: [{ type: 'object', required: true, message: 'Selecciona una fecha válida!' }],
                                    })(
                                        <DatePicker style={{width:'100%'}} />
                                    )}
                                </FormItem>
                            </div>



                            : null
                        }

                    </div>
                    <FormItem>
                        <Button type="primary" htmlType={'submit'} size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>

                </Form>

            </Modal>

        )
    }
);

export default CatalogoForm;