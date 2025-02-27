import {
  downloadResourceRepository,
  getResourcesRepository,
  insertResourceRepository,
  uploadResourceRepository,
} from './repositories';
import { editResourceRepository } from './repositories/edit-resource.repository';
import { removeResourceRepository } from './repositories/remove-resource.repository';

export const uploadResource = async ({ file }) => {
  try {
    const { filePath, error } = await uploadResourceRepository(file);
    if (error) {
      throw error;
    }

    return filePath;
  } catch (error) {
    console.log(error);
  }
};

export const insertResrouce = async payload => {
  try {
    const { data, error } = await insertResourceRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editResource = async payload => {
  try {
    const { data, error } = await editResourceRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeResource = async payload => {
  try {
    const { data, error } = await removeResourceRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getResources = async () => {
  try {
    const { data, error } = await getResourcesRepository();
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const downloadResource = async ({ fileName }) => {
  try {
    const { data, error } = await downloadResourceRepository({ fileName });
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
