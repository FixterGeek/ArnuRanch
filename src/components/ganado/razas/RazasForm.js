import React, {Component} from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;

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


const RazasForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, name} = props;
        const{getFieldDecorator} = form;


        return(
            <Modal
                visible={visible}
                title={"Nuevo Usuario"}
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
                            label="Nombre de la Raza"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                initialValue:name
                            })(
                                <Input />
                            )}
                        </FormItem>
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

export default RazasForm;
