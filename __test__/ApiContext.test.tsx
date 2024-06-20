import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { ApiContextProvider, useApiContext } from '../context/ApiContext';
import fetchMock from 'jest-fetch-mock';
import TestComponent from './TestComponent';

interface IProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

describe('ApiContext', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('initially shows loading state', () => {
    const { getByTestId } = render(
      <ApiContextProvider>
        <TestComponent />
      </ApiContextProvider>
    );

    expect(getByTestId('loading').props.children).toBe('Loading');
  });

  it('downloads products and updates context', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: '1', name: 'Product 1', description: '', logo: '', date_release: '', date_revision: '' },
      { id: '2', name: 'Product 2', description: '', logo: '', date_release: '', date_revision: '' }
    ]));

    const { getByTestId } = render(
      <ApiContextProvider>
        <TestComponent />
      </ApiContextProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('Loaded');
      expect(getByTestId('product-count').props.children).toBe(0);
    });
  });

  it('deletes a product and updates context', async () => {
    fetchMock.mockResponses(
      [JSON.stringify([
        { id: '1', name: 'Product 1', description: '', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: '', logo: '', date_release: '', date_revision: '' }
      ]), { status: 200 }],
      ['', { status: 200 }]
    );

    const { getByTestId } = render(
      <ApiContextProvider>
        <TestComponent />
      </ApiContextProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('Loaded');
      expect(getByTestId('product-count').props.children).toBe(0);
    });

    await act(async () => {
      await useApiContext().deleteProduct('1');
    });

    await waitFor(() => {
      expect(getByTestId('product-count').props.children).toBe(0);
    });
  });

  it('sets and clears current product', () => {
    const { getByTestId } = render(
      <ApiContextProvider>
        <TestComponent />
      </ApiContextProvider>
    );

    act(() => {
      useApiContext().setCurrentProduct({ id: '1', name: 'Product 1', description: '', logo: '', date_release: '', date_revision: '' });
    });

    expect(getByTestId('current-product').props.children).toBe('Product 1');

    act(() => {
      useApiContext().clearCurrentProduct();
    });

    expect(getByTestId('current-product').props.children).toBe('');
  });
});
