import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import GridPanel from '../../components/GridPanel';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import Link from '../../components/Link';

class GridPanelExample extends Component {
  state = {
    isFetching: false,
    data: [
      {
        firstName: 'Harry',
        lastName: 'Potter',
        house: 'Gryffindor',
      },
      {
        firstName: 'Luna',
        lastName: 'Lovegood',
        house: 'Ravenclaw',
      },
      {
        firstName: 'Ronald',
        lastName: 'Weasley',
        house: 'Gryffindor',
      },
      {
        firstName: 'Draco',
        lastName: 'Malfoy',
        house: 'Slytherin',
      },
      {
        firstName: 'Hermione',
        lastName: 'Granger',
        house: 'Gryffindor',
      },
      {
        firstName: 'Ginny',
        lastName: 'Weasely',
        house: 'Gryffindor',
      },
      {
        firstName: 'Fred',
        lastName: 'Weasley',
        house: 'Gryffindor',
      },
      {
        firstName: 'Severous',
        lastName: 'Snape',
        house: 'Slytherin',
      },
    ],
    start: 0,
    end: 3,
    sort: {},
    expandedRowIndices: [],
    expandedDetailIndex: null,
    page: 1,
  };

  changePage = page => {
    action('changePage')(page);
    this.setState({
      isFetching: true,
    });

    // retrieve the required data from the api
    setTimeout(() => {
      this.setState({
        isFetching: false,
        start: (page.page - 1) * page.pageSize,
        end: page.page * page.pageSize,
        page: page.page,
      });
    }, 1000);
  };

  refreshGrid = () => {
    action('refreshGrid')();
    this.setState({
      isFetching: true,
    });

    // load the grid data again from the api
    setTimeout(() => {
      this.setState({
        isFetching: false,
      });
    }, 1000);
  };

  onSort = sort => {
    action('sort')(sort);
    this.setState({
      isFetching: true,
    });
    setTimeout(() => {
      let sortDirection = 1;
      const sortProperty = sort.name;
      if (
        this.state.sort.property === sort.name &&
        this.state.sort.direction === 'ASC'
      ) {
        this.setState({
          sort: {
            direction: 'DESC',
            property: sortProperty,
          },
        });
        sortDirection = -1;
      } else {
        this.setState({
          sort: {
            direction: 'ASC',
            property: sortProperty,
          },
        });
      }
      this.setState({
        data: this.state.data.sort((a, b) => {
          if (a[sortProperty] < b[sortProperty]) {
            return -sortDirection;
          } else {
            return sortDirection;
          }
        }),
        isFetching: false,
      });
    }, 1000);
  };

  renderDetailExpansion = data => {
    action('renderDetailExpansion')(data);
    return (
      <div>
        <h2>Details Panel :-)</h2>
        <p>{data.firstName}</p>
        <div>{data.lastName} belongs to {data.house}</div>
        <Button
          onClick={() => {
            this.setState({
              expandedDetailIndex: null,
            });
          }}
        >
          {' '}Close Panel
        </Button>
      </div>
    );
  };

  renderRowExpansion = (data, index) => {
    action('renderRowExpansion')(data, index);
    return (
      <div>
        <h2>`Row Expanded for row-${index}`</h2>
        <h3>{data.firstName}</h3>
        <p>{data.lastName} belongs to {data.house}</p>
        <br />
      </div>
    );
  };

  renderRowExpander = (data, index) => {
    const rowExpanded =
      this.state.expandedRowIndices.find(element => index === element) >= 0;
    return (
      <div
        onClick={() => {
          if (rowExpanded) {
            this.setState({
              expandedRowIndices: this.state.expandedRowIndices.filter(
                element => index !== element
              ),
            });
          } else {
            const expandedRowIndices = this.state.expandedRowIndices;
            expandedRowIndices.push(index);
            this.setState({
              expandedRowIndices: expandedRowIndices,
            });
          }
        }}
      >
        <Icon
          name={rowExpanded ? 'chevron--down' : 'chevron--right'}
          description="expand row"
          style={{
            fill: '#8c9ba5',
          }}
        />
      </div>
    );
  };

  renderFirstName = (data, index) => {
    return (
      <Link
        href="#"
        onClick={event => {
          event.stopPropagation();
          if (this.state.expandedDetailIndex === index) {
            this.setState({
              expandedDetailIndex: null,
            });
          } else {
            this.setState({
              expandedDetailIndex: index,
            });
          }
        }}
      >
        {data.firstName}
      </Link>
    );
  };

  render() {
    const columns = [
      {
        name: 'rowExpander',
        title: '',
        render: this.renderRowExpander,
        width: 5,
      },
      {
        name: 'firstName',
        title: 'First Name',
        render: this.renderFirstName,
        width: 25,
        sortable: true,
      },
      {
        name: 'lastName',
        title: 'Last Name',
        render: data => data.lastName,
        width: 25,
      },
      {
        name: 'house',
        title: 'House',
        render: data => data.house,
        hideable: true,
        hidden: false,
      },
    ];

    const displayData = this.state.data.slice(this.state.start, this.state.end);

    return (
      <GridPanel
        columns={columns}
        data={displayData}
        changePage={this.changePage}
        detailPanelWidth={70}
        expandedDetailIndex={this.state.expandedDetailIndex}
        expandedRowIndices={this.state.expandedRowIndices}
        isFetching={this.state.isFetching}
        localStorageKey="testGridPanel1"
        name="testGridpanel1"
        onSort={this.onSort}
        page={this.state.page}
        pageSizes={[3, 6, 9, 15]}
        renderDetailExpansion={this.renderDetailExpansion}
        renderRowExpansion={this.renderRowExpansion}
        refreshGrid={this.refreshGrid}
        resetGrid={() => {}}
        showPager
        sort={this.state.sort}
        totalItems={this.state.data.length}
      />
    );
  }
}

storiesOf('GridPanel', module)
  .addWithInfo(
    'Full GridPanel',
    `
      The GridPanel will render a grid with a pagination toolbar that has NextPage, PreviousPage, Column show/hide,
      Page Size Change, Page Number Change, Reset, Refresh. The grid also allows for additional data to be displayed as
      an optional Detail panel or Rows can be expanded to show more data. The grid does not do the actual fetching
      of data when changing pages and refreshing the grid. The grid also saves the state of the grid in localstorage
      and persists the state on subsequent loads.
    `,
    () => <GridPanelExample />,
    {
      propTables: [GridPanel],
    }
  )
  .addWithInfo(
    'Simple GridPanel - empty grid',
    `
      This shows a gridPanel in an empty state
    `,
    () => {
      const columns = [
        {
          title: 'First Name',
          render: data => data.firstName,
          width: 25,
        },
        {
          title: 'Last Name',
          render: data => data.lastName,
          width: 25,
        },
        {
          title: 'House',
          render: data => data.house,
        },
      ];

      const data = [];

      return (
        <GridPanel
          columns={columns}
          data={data}
          expandedDetailIndex={null}
          expandedRowIndices={[]}
          isFetching={false}
          name="testGridpanel2"
          renderDetailExpansion={() => {}}
          renderRowExpansion={() => {}}
          resetGrid={() => {}}
          showPager={true}
          sort={{
            direction: 'ASC',
            property: 'firstName',
          }}
          totalItems={0}
        />
      );
    }
  )
  .addWithInfo(
    'Simple GridPanel - loading state',
    `
      This shows a gridPanel that is loading 
    `,
    () => {
      const columns = [
        {
          title: 'First Name',
          render: data => data.firstName,
          width: 25,
        },
        {
          title: 'Last Name',
          render: data => data.lastName,
          width: 25,
        },
        {
          title: 'House',
          render: data => data.house,
        },
      ];

      const data = [];

      return (
        <GridPanel
          columns={columns}
          data={data}
          expandedDetailIndex={null}
          expandedRowIndices={[]}
          isFetching={true}
          name="testGridpanel3"
          renderDetailExpansion={() => {}}
          renderRowExpansion={() => {}}
          resetGrid={() => {}}
          showPager={true}
          sort={{
            direction: 'ASC',
            property: 'firstName',
          }}
          totalItems={0}
        />
      );
    }
  );
