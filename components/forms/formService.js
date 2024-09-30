import axios from 'axios';
import { origin } from '../../src/config';
axios.defaults.withCredentials = true;

/************************GET_PROJECTS**************** */
export const getProjects = async () => {
  // const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/bids/?populate=*',
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getMyProjectsFilter = async (status) => {
  // const jwt = localStorage.getItem('hinyn-cjwt');
  console.log(status);
  let url;

  if (status) {
    url = '/bids/?populate=*&filters[status]=' + status;
  } else {
    url = '/bids/?populate=*';
  }
  return axios
    .get(
      origin + url,

      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const myProjectsBids = async (page) => {
  console.log(page);
  const jwt = localStorage.getItem('hinyn-cjwt');
  const clientId = localStorage.getItem('hinyn-cid');
  return axios
    .get(
      origin +
        '/clients/' +
        clientId +
        '?populate=bids&pagination%5Bpage%5D=' +
        page,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const myProjectsBids2 = async (page) => {
  console.log(page);
  const jwt = localStorage.getItem('hinyn-cjwt');
  const clientId = localStorage.getItem('hinyn-cid');
  return axios
    .get(
      origin + '/proposals?populate=*&filters[client][id]=' + clientId,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getFilteredProjects = async ({
  category,
  skill,
  location,
  budget,
}) => {
  let url =
    origin +
    '/bids?populate=*' +
    '&filters[categories][key]=' +
    category +
    '&filters[skills][slug]=' +
    skill +
    '&filters[country][name]=' +
    location;

  // If budget is provided, add the minBudget filter to the URL
  if (budget) {
    url += '&filters[minBudget]=' + budget;
  }

  try {
    const response = await axios.get(url, {
      withCredentials: true,
      crossDomain: true,
    });

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
/****************************BROWSE_PROJECTS_FILTERS*********************************/
export const projectFilterCat = async (category) => {
  console.log(category);

  return axios
    .get(origin + '/bids?populate=*&filters[categories][key]=' + category, {
      withCredentials: true,
      crossDomain: true,
    })
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getProjectsByNameAndDes = async (category) => {
  console.log(category);

  return axios
    .get(
      origin +
        '/bids?filters[$or][0][title][$contains]=' +
        category +
        '&filters[$or][1][description][$contains]=' +
        category,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterBudget = async (category) => {
  console.log(category);

  return axios
    .get(origin + '/bids?populate=*&filters[maxBudget]=' + category, {
      withCredentials: true,
      crossDomain: true,
    })
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterBudgetCat = async (budget, category) => {
  console.log(category);

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[maxBudget]=' +
        budget +
        '&filters[categories][key]=' +
        category,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterLocation = async (location) => {
  console.log(location);

  return axios
    .get(origin + '/bids?populate=*&filters[country][name]=' + location, {
      withCredentials: true,
      crossDomain: true,
    })
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterBudgetLocation = async (budget, location) => {
  console.log(location);

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[maxBudget]=' +
        budget +
        '&filters[country][name]=' +
        location,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterCatLocation = async (category, location) => {
  console.log('Category,Location');

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[country][name]=' +
        location +
        '&filters[categories][key]=' +
        category,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterCategoryBudgetLocation = async (
  category,
  budget,
  location
) => {
  // console.log('Category,Location');

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[country][name]=' +
        location +
        '&filters[categories][key]=' +
        category +
        '&filters[maxBudget]=' +
        budget,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterCatSkill = async (category, skill) => {
  console.log(category, skill);

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[categories][key]=' +
        category +
        '&filters[skills][slug]=' +
        skill,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterCatSkillLoc = async (category, skill, location) => {
  console.log(category, skill, location);

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[categories][key]=' +
        category +
        '&filters[skills][slug]=' +
        skill +
        '&filters[country][name]=' +
        location,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterCatSkillBudget = async (category, skill, budget) => {
  console.log(category, skill, budget);

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[categories][key]=' +
        category +
        '&filters[skills][slug]=' +
        skill +
        '&filters[maxBudget]=' +
        budget,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const projectFilterAll = async (category, skill, location, budget) => {
  console.log(category, skill, location, budget);

  return axios
    .get(
      origin +
        '/bids?populate=*&filters[categories][key]=' +
        category +
        '&filters[skills][slug]=' +
        skill +
        '&filters[country][name]=' +
        location +
        '&filters[maxBudget]=' +
        budget,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
/****************************************PROJECTS_PAGINATIOn************************************/

export const getProjectsPagination = async (page) => {
  // console.log('qqq', page);

  const url = origin + '/bids?populate=*&pagination%5Bpage%5D=' + page;
  return axios
    .get(
      url,
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const addTransaction = async (Data) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/transactions',
      {
        data: Data,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
export const subscription = async (Data) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  console.log(Data.client, Data.subscription);
  return axios
    .post(
      origin + '/transactions/subscribe',
      {
        subscription: Data.subscription,
        client: Data.client,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
export const paymentForBid = async (Data) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  console.log(Data);
  return axios
    .post(
      origin + '/transactions/payment',
      Data,

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
export const addMilestone = async (Data) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/milestones',
      {
        data: Data,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
export const getMilestone = async (Data) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/milestones',

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
export const updateMilestone = async (Data, Id) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .put(
      origin + '/milestones/' + Id,
      {
        data: Data,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};
/*********WALLET**********/
export const getWallet = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/wallets/?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getUserWallet = async (id) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/wallets/?filters[client]=' + id,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
/**********Languages****************** */
export const getLanguages = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/languages?pagination%5BpageSize%5D=100',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const addDocData = async (docData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/documents',
      {
        data: docData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
export const uploadFiles = async (formData) => {
  console.log(formData);
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/upload',
      formData,

      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response };
    });
};
export const uploadPortfolio = async (formData) => {
  console.log(formData);
  const jwt = localStorage.getItem('hinyn-cjwt');
  console.log('FormData:', formData);
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  return axios
    .post(
      origin + '/upload',
      formData,

      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response };
    });
};
export const getDocs = async (formData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/documents/' + 79,

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response };
      } else {
        return { status: false, data: response };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
/*********UPLOAD FILE**********/
export const uploadImage = async (imageData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(origin + '/api/upload', imageData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
      crossDomain: true,
    })
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response };
    });
};
export const getImage = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/api/upload',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
/****************MESSAGES*****************/
export const addMessages = async (Data) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/messages',
      {
        data: Data,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
export const getMessages = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/messages/?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getMyMessages = async (id) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/messages/?populate=*&filters[recipient]=' + id,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getChat = async (data) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin +
        `/messages/?populate=*&filters[recipient]=${data.cid}&filters[sender]=${data.senderId}||filters[recipient]=${data.senderId}&filters[sender]=${data.cid}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const passwordChange = async (password) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/auth/change-password',
      {
        password: password.newPassword,
        currentPassword: password.currentPassword,
        passwordConfirmation: password.confirmPassword,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const emailChange = async (data, id) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/users/' + id,
      {
        data: data,
        // password: password.newPassword,
        // currentPassword: password.currentPassword,
        // passwordConfirmation: password.confirmPassword,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const emailVerify = async (email) => {
  console.log(email);
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/auth/send-email-confirmation',
      {
        email: email,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const resendEmail = async (id) => {
  console.log(id, 'resendapicalled');
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/notifications/resend-email-verification',
      {
        user_id: id,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const loginUser = async (clientData) => {
  return axios
    .post(
      origin + '/auth/local',
      {
        identifier: clientData.email,
        password: clientData.password,
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};
/* BIDS */
export const addBidData = async (bidData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .post(
      origin + '/bids',
      {
        data: bidData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response?.data.error.message };
    });
};

export const getBids = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/bids/?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getBidsAsc = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/bids/?sort=asc',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getBidsStatus = async (status) => {
  const jwt = localStorage.getItem('hinyn-cjwt');

  // Construct the API request URL based on the status filter
  let url = origin + '/bids/?populate=*';
  if (status && status !== 'all') {
    url += '&filters[status]=' + status;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
      crossDomain: true,
    });

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getBidData = async (bidId) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/bids/' + bidId + '?populate=*',

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const deleteBidData = async (bidId) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .delete(
      origin + '/bids/' + bidId,

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getBidsOfClient = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  // const cid = localStorage.getItem('hinyn-cid');
  return axios
    .get(
      // origin + '/bids?filters[client]=' + cid + '&populate=*',
      origin + '/bids',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getProposalsOfBid = async (bidId) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/bids/' + bidId + '?populate[proposals][populate][0]=client',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const updateBidData = async (proposalData, bidId) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .put(
      origin + '/bids/' + bidId,
      {
        data: proposalData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};

export const registerUser = async (clientData) => {
  const url = origin + '/users';
  return axios
    .post(
      url,
      {
        username: clientData.email,
        email: clientData.email,
        password: clientData.password,
        role: 1,
        step: 1,
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};

export const logoutUser = () => {
  if (localStorage.getItem('hinyn-cjwt')) {
    localStorage.removeItem('hinyn-cjwt');
    localStorage.removeItem('hinyn-cid');
    localStorage.removeItem('hinyn-uid');
    localStorage.removeItem('hinyn-usertype');
    localStorage.removeItem('hinyn-tempid');
  }
};

/* CLIENTS */
export const getClientsAll = async (page) => {
  // console.log('qqq', page);

  const url = origin + '/clients?populate=*';
  return axios
    .get(
      url,
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getClients = async (page) => {
  // console.log('qqq', page);

  const url = origin + '/clients?populate=*&pagination%5Bpage%5D=' + page;
  return axios
    .get(
      url,
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getClients2 = async () => {
  // console.log('qqq', page);

  const url = origin + '/clients?populate=*&pagination%5Bpage%5D=' + 2;
  return axios
    .get(
      url,
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getClientsForChatList = async () => {
  const url = origin + '/clients?populate=*';
  return axios
    .get(
      url,
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getClientData = async (clientData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/clients/' + clientData.id + '?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getClientDataBids = async (clientData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/clients/' + clientData.id + '?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getClientDataProposals = async (clientData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin +
        '/clients/' +
        clientData.id +
        '?populate=bids&populate=languages',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getClientsHFilter4 = async (value1, value2) => {
  // concole.log(value, 'location');
  try {
    console.log(value1, value2, 'sdfsd');
    const response = await axios.get(
      origin +
        '/clients?populate=*&filters[skills][slug]=' +
        value2 +
        '&filters[categories][key]=' +
        value1,
      // value +
      // '&filters[skills][slug]=' +
      // value,
      // value +

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getClientCategories = async (clientData) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/clients/' + clientData.id + '?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getFilteredClients = async ({ category, skill, location }) => {
  console.log('api', category, skill, location);

  return axios
    .get(
      origin +
        '/clients?populate=*&filters[categories][key]=' +
        category +
        '&filters[skills][slug]=' +
        skill +
        '&filters[country][name]=' +
        location,
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getFilteredClients2 = async (category, skill, location) => {
  console.log(category, skill, location);

  return axios
    .get(
      origin +
        '/clients?populate=*&filters[categories][key]=' +
        category +
        '&filters[skills][slug]=' +
        skill +
        '&filters[country][name]=' +
        location,

      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getFilteredClientsProfile = async (
  category,
  skill,
  location,
  name
) => {
  console.log(category, skill, location, name);

  return axios
    .get(
      origin +
        '/clients?populate=*&filters[categories][key]=' +
        category +
        '&filters[skills][slug]=' +
        skill +
        '&filters[country][name]=' +
        location +
        '&filters[firstName]=' +
        name,

      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getFilteredClientsOnlyName = async (name) => {
  console.log(name);

  return axios
    .get(
      origin +
        '/clients?populate=*&filters[firstName]=' +
        name +
        '&filters[accountType]=' +
        1,

      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getFilteredClientsOnlyLocation = async (name) => {
  console.log(name, 'COUNTRY');

  return axios
    .get(
      origin +
        '/clients?populate=country&filters[country][name]=' +
        name +
        '&filters[accountType]=' +
        1,

      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getClientsHFilter = async (value) => {
  // concole.log(value, 'location');
  try {
    console.log(value, 'location');
    const response = await axios.get(
      origin + '/clients?populate=*&filters[country][name]=' + value,
      // value +
      // '&filters[skills][slug]=' +
      // value,
      // value +

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getClientsHFilter2 = async (value) => {
  // concole.log(value, 'location');
  try {
    console.log(value, 'location');
    const response = await axios.get(
      origin + '/clients?populate=skills&filters[skills][slug]=' + value,
      // value +
      // '&filters[skills][slug]=' +
      // value,
      // value +

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getClientsHFilter3 = async (value) => {
  // let url = origin + '/clients?populate=categories';
  try {
    console.log(value, 'location');
    const response = await axios.get(
      origin +
        '/clients?populate=categories&filters[categories][key]=' +
        value +
        '&filters[accountType=]' +
        1,
      // value +
      // '&filters[skills][slug]=' +
      // value,
      // value +

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getClientsByNameAndDes = async (value) => {
  // let url = origin + '/clients?populate=categories';
  try {
    console.log(value, 'location');
    const response = await axios.get(
      origin +
        '/clients?filters[$or][0][firstName][$contains]=' +
        value +
        '&filters[$or][1][description][$contains]=' +
        value,
      // value +
      // '&filters[skills][slug]=' +
      // value,
      // value +

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getFilteredClientsRating = async (value) => {
  try {
    console.log(value, 'location');
    const response = await axios.get(
      origin +
        '/clients?populate=categories&filters[rating]=' +
        value +
        '&filters[accountType=]' +
        1,

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const sortClientsRating = async () => {
  try {
    console.log('sortRating');
    const response = await axios.get(
      origin + '/clients?sort=rating' + '&filters[accountType=]' + 1,

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const requestClientsNewlyAdded = async () => {
  try {
    console.log('sortnewadded');
    const response = await axios.get(
      origin + '/clients?sort=createdAt' + '&filters[accountType=]' + 1,

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};

export const getFilteredClientsCatRating = async (category, rating) => {
  try {
    console.log(category, rating, 'cat,rating');
    const response = await axios.get(
      origin +
        '/clients?populate=*&filters[categories][key]=' +
        category +
        '&filters[rating]=' +
        rating +
        '&filters[accountType=]' +
        1,
      // `/clients?populate=*?filters%5Bcategories%5D=2&filters[rating]=1`,
      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getFilteredClientsLocationRating = async (location, rating) => {
  try {
    console.log(value, 'location');
    const response = await axios.get(
      origin +
        '/clients?populate=*&filters[country][name]=' +
        location +
        '&filters[rating]=' +
        rating +
        '&filters[accountType=]' +
        1,

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getFilteredClientsALLS = async (v1, v2, v3, v4) => {
  try {
    // console.log(value, 'ALL sele');
    const response = await axios.get(
      origin +
        '/clients?populate=*&filters[rating]=' +
        v4 +
        '&filters[country][name]=' +
        v3 +
        '$filters[categories][key]=' +
        v1 +
        '&filters[skills][slug]=' +
        v2 +
        '&filters[accountType=]' +
        1,

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getFilteredClientsCatLocation = async (value1, value2) => {
  // concole.log(value, 'location');
  try {
    console.log(value1, value2, 'CAt Location');
    const response = await axios.get(
      origin +
        '/clients?populate=*&filters[country][name]=' +
        value2 +
        '&filters[categories][key]=' +
        value1,
      // value +
      // '&filters[skills][slug]=' +
      // value,
      // value +

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getFilteredClientsCatCountry = async (value1, value2) => {
  // concole.log(value, 'location');
  try {
    console.log(value1, value2, 'CAt NAme');
    const response = await axios.get(
      origin +
        '/clients?populate=*&filters[country][name]=' +
        value1 +
        '&filters[categories][key]=' +
        value2,
      // value +
      // '&filters[skills][slug]=' +
      // value,
      // value +

      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
export const getClientsForCategory = async (category) => {
  let url = origin + '/clients?populate=categories';
  console.log(category);
  // If category is provided, add it to the URL as a filter
  if (category) {
    url += '&filters[categories][title]=' + category;
  }

  try {
    const response = await axios.get(url, {
      withCredentials: true,
      crossDomain: true,
    });
    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { status: false, data: error };
  }
};

export const getClientsHeaderFilter = async (filter) => {
  let url = origin + '/clients?populate=*&filters[categories][title]=';

  // If filter is provided, add filters to the URL
  // if (filter) {
  //   const { category, skill, country } = filter;
  //   if (category) {
  //     url += '&filters[categories][title]=' + category;
  //   }
  //   if (skill) {
  //     url += '&filters[skills][title]=' + skill;
  //   }
  //   if (country) {
  //     url += '&filters[country][name]=' + country;
  //   }
  // }

  try {
    const response = await axios.get(url, {
      withCredentials: true,
      crossDomain: true,
    });
    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { status: false, data: error };
  }
};

export const addClientData = async (userData, jwt) => {
  const req = await getMeData();
  console.log('add client data req', req);
  let clientData = {
    ...req.data,
    // uuid: `client-${userData.user}`,
    ...userData,
  };
  return axios
    .post(
      origin + '/clients',
      {
        data: clientData,
        // data: { ...req.data, uuid: `client-${userData.user}` },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};

export const updateClientData = async (userData, clientId) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .put(
      origin + '/clients/' + clientId,
      {
        data: userData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};
export const getClientsForAscDsc = async (apiValue) => {
  try {
    const response = await axios.get(
      origin + '/clients?sort[0]=id:' + apiValue,
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    );

    if (response.data) {
      return { status: true, data: response.data };
    } else {
      return { status: false, data: response.data.message };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { status: false, data: error };
  }
};
/* USERS */
export const getUserData = async (userId) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .get(
      origin + '/users/' + userId,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getMeData = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .get(
      origin + '/users/me',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getLoggedInUserData = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .get(
      origin + '/users/me?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const updateUserUsername = async (clientData, clientId) => {
  console.log('updateUserUsername');
  return axios
    .put(
      origin + '/users/' + clientData.id,
      {
        username: clientData?.username,
        step: clientData?.step,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${clientData.jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response };
    });
};

export const updateUserData = async (userData) => {
  const userId = localStorage.getItem('hinyn-uid');
  const jwt = localStorage.getItem('hinyn-cjwt');
  console.log(userData);
  return axios
    .put(
      origin + '/users/' + userData.user,
      {
        client: userData?.cid,
        step: userData?.step,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};

/* Categories */
export const getCategories = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(origin + '/categories?populate=*', {
      withCredentials: true,
      crossDomain: true,
    })
    .then(async (response) => {
      // console.log('Response: ', response.data);
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
/* Countries*/
export const getCountries = async () => {
  // const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .get(
      origin + '/countries?populate=*',

      {
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${jwt}`,
        // },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      // console.log('Response: ', response.data);
      if (response) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.data.message };
    });
};
export const getCountriesByiso = async (iso) => {
  console.log(iso, 's');
  // const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .get(origin + '/countries?populate=*&filters%5Biso%5D=' + iso, {
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${jwt}`,
      // },
      withCredentials: true,
      crossDomain: true,
    })
    .then(async (response) => {
      // console.log('Response: ', response.data);
      if (response) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.data.message };
    });
};
export const getCountriesById = async (iso) => {
  console.log(iso, 's');
  // const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .get(
      origin +
        '/countries?populate[0]=cities&populate[1]=states&filters[id]=' +
        iso,
      {
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${jwt}`,
        // },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      // console.log('Response: ', response.data);
      if (response) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.data.message };
    });
};
export const getCountriesByName = async (iso) => {
  console.log(iso, 's');
  // const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .get(origin + '/countries?populate=*&filters%5Bname%5D=' + iso, {
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${jwt}`,
      // },
      withCredentials: true,
      crossDomain: true,
    })
    .then(async (response) => {
      // console.log('Response: ', response.data);
      if (response) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.data.message };
    });
};
export const getSpecificCategory = async (title) => {
  return axios
    .get(
      origin + '/categories?filters[title]=' + title,

      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      // console.log('Response: ', response.data);
      if (response) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.data.message };
    });
};
/* Cities*/
export const getCities = async (iso) => {
  return axios
    .get(
      origin + '/cities?filters[country][iso]=' + iso,

      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      // console.log('Response: ', response.data);
      if (response) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.data.message };
    });
};

/* skills */
export const getSkills = async () => {
  return axios
    .get(
      // origin + '/categories/' + categoryId + '?populate=*',
      origin + '/skills',

      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getApiSkillById = async (categoryId) => {
  return axios
    .get(
      // origin + '/skills/' + id,
      origin + '/categories/' + categoryId + '?populate=*',
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

/* professional category */
export const addProfessionalCategoriesData = async (userData) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .post(
      origin + '/professional-categories',
      {
        data: userData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};

/* PROPOSALS */
export const addProposal = async (proposalData) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .post(
      origin + '/proposals',
      {
        data: proposalData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};

export const getProposals = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/proposals?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getMyProposal = async (client, bid) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin +
        '/proposals' +
        '?filters[client]=' +
        client +
        '&filters[bid]=' +
        bid,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
export const getProposalData = async (proposalId) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  return axios
    .get(
      origin + '/proposals/' + proposalId + '?populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getProposalsOfClient = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  const cid = localStorage.getItem('hinyn-cid');
  return axios
    .get(
      origin + '/proposals?filters[client][id][$eq]=' + cid + '&populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getProposalsOfClientOnABid = async (bidId) => {
  const jwt = localStorage.getItem('hinyn-cjwt');
  const cid = localStorage.getItem('hinyn-cid');
  return axios
    .get(
      origin +
        '/proposals?filters[client][id][$eq]=' +
        cid +
        '&filters[bid][id][$eq]=' +
        bidId +
        '&populate=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const updateProposalData = async (proposalData, proposalId) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';

  return axios
    .put(
      origin + '/proposals/' + proposalId,
      {
        data: proposalData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};
export const updateProposalStatus = async (proposalData, proposalId) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';

  return axios
    .put(
      origin + '/proposals/' + proposalId,
      {
        data: proposalData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};
export const deleteProposal = async (proposalId) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  console;
  return axios
    .delete(
      origin + '/proposals/' + proposalId,

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};
const BASE_URL =
  process.env.REACT_APP_STRAPI_BASE_URL ||
  'https://murmuring-everglades-65320-580682e5248e.herokuapp.com';

export const getStrapiMedia = (url) => {
  if (!url) {
    console.warn('Invalid URL provided to getStrapiMedia:', url);
    return '';
  }
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const deleteClientProfile = async (clientId) => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios
    .delete(
      origin + '/clients/' + clientId,

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data };
    });
};
