import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from "react-bootstrap/esm/FormSelect";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class SearchBarComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() 
    {
        let options = this.props.fields.map((option) => 
            <option key={option.value} value={option.value} label={option.label} />
        );
        return <div>
                {this.props.currentField &&
                    <p>
                        Current Search: Field={this.props.currentField}, Value={this.props.currentValue}
                    </p>
                }
                <div className='tableSearch'>
                    <Row>

                    <Form className="d-flex align-items-center" onSubmit={this.handleSubmit}>

                            <Col xs={4}>
                        <FormControl value={this.props.searchValue} placeholder='Enter search term' onChange={this.props.valueUpdate}/>
                            </Col>

                            <Col xs={3}>
                        <FormSelect className="ms-2" value={this.props.searchField} onChange={this.props.fieldUpdate}>
                            <option value={-1} label={'Select search field'} />
                            {options}
                        </FormSelect>
                            </Col>

                            <Col xs={4}>
                        <Button className="ms-3" variant="primary" size="sm" onClick={this.handleSubmit}>Search</Button>
                        <Button  className="ms-2" variant="danger" size="sm" onClick={this.handleClearSearch}>Clear</Button>
                            </Col>
                        
                    </Form>
                    </Row>


                </div>
            </div>
    }

    handleSubmit(event)
    {
        event.preventDefault();
        //check for valid field selection
        if(this.props.searchField !== -1 && this.props.searchValue !== '')
        {
            this.props.search();
        }
    }

    handleClearSearch(event)
    {
        this.props.clearSearch();
    }
}

export default SearchBarComponent;