// Close siblings of clicked item
const closeActiveSibling = function( clickedAccordion ) {

  const activeAccordion = clickedAccordion.parentNode.querySelector( ':scope > .wp-block-pandp-blocks-accordion.is-active' );

  if( activeAccordion && ( activeAccordion !== clickedAccordion ) ) {

    closeActiveChildren( activeAccordion );
    activeAccordion.querySelector( '.accordion-trigger' ).setAttribute( 'aria-expanded', 'false' );
    activeAccordion.classList.remove( 'is-active' );

  }

}

// Close any children of accordion that is closed
const closeActiveChildren = function( clickedAccordion ) {

  const activeChildren = clickedAccordion.querySelectorAll( '.wp-block-pandp-blocks-accordion.is-active' );

  if( activeChildren ) {

    for( let i = 0; i < activeChildren.length; i++ ) {

      activeChildren[i].querySelector( '.accordion-trigger' ).setAttribute( 'aria-expanded', 'false' );
      activeChildren[i].classList.remove( 'is-active' );

    }

  }

}

// Toggle class of clicked item
const accordionToggle = function(e) {

    e.preventDefault();

    // If the accordion that was clicked is currently active
    if( this.parentNode.classList.contains( 'is-active' ) ) {

      // Close any children if necessary
      closeActiveChildren( this.parentNode );
      // Change aria state
      this.setAttribute( 'aria-expanded', 'false' );
      // Close the accordion that was clicked
      this.parentNode.classList.remove( 'is-active' );

    } else {

      // Check for an active sibling and close it if necessary
      closeActiveSibling( this.parentNode );
      // Change aria state
      this.setAttribute( 'aria-expanded', 'true' );
      // Open the accordion that was clicked
      this.parentNode.classList.toggle( 'is-active' );

    }

}

const addParentAttributes = function( accordion, number ) {

  const accordionContainer = accordion.parentNode.parentNode;

  accordionContainer.setAttribute( 'data-allow-toggle', '' );

}

const addButtonAttributes = function( accordion, number ) {

  const accordionButton = accordion;

  accordionButton.setAttribute( 'id', 'accordion-' + number + '-button' );
  accordionButton.setAttribute( 'aria-controls', 'accordion-' +  number );

}

const addContentAttributes = function( accordion, number ) {

  const accordionContent = accordion.nextSibling;

  accordionContent.setAttribute( 'id', 'accordion-' + number );
  accordionContent.setAttribute( 'aria-labelledby', 'accordion-' + number + '-button' );

}

// Listen for click
const accordionListener = function() {

  const accordions = document.querySelectorAll( '.wp-block-pandp-blocks-accordion .accordion-trigger' );

  if( accordions ) {

    for( let i = 0; i < accordions.length; i++ ) {

      addParentAttributes( accordions[i], i );
      addButtonAttributes( accordions[i], i );
      addContentAttributes( accordions[i], i );

      accordions[i].addEventListener( 'click', accordionToggle, false );

    }

  }

}

accordionListener();
