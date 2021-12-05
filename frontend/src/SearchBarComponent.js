import React from "react";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from "react-bootstrap/esm/FormSelect";
import Badge from "react-bootstrap/Badge"


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
                    <Form onSubmit={this.handleSubmit}>
                        <FormControl value={this.props.searchValue} placeholder='Enter search term' onChange={this.props.valueUpdate}/>
                        <FormSelect value={this.props.searchField} onChange={this.props.fieldUpdate}>
                            <option value={-1} label={'Select search field'} />
                            {options}
                        </FormSelect>
                        <Badge bg="primary" onClick={this.handleSubmit}>Search</Badge>
                        <Badge bg="danger" onClick={this.handleClearSearch}>Clear</Badge>
                    </Form>
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