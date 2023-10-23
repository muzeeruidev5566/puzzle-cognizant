describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should see my reading list and remove book', () => {
    cy.get('[data-testing="toggle-reading-list"]').click({multiple: true});

    cy.get('[data-testing="removing-item"]').click({multiple: true});

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'You did not added any books to your reading list yet.'
    );
  });
});
