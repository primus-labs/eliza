/********************************************************************************************
 * Abstract base class for performing Fully Homomorphic Encryption (FHE) operations.
 * Derived classes should implement encryption, evaluation, decryption, and compilation functionalities.
 *********************************************************************************************/
export abstract class FheOperate {
    /**
     * Encrypts the given data file.
     * This method accepts a path to a data file and encrypts the data contained in the file.
     *
     * @param data_file - The path to the data file to be encrypted.
     * @returns {boolean} - Returns true if the encryption was successful; otherwise, returns false.
     *
     */
    abstract encrypt(data_file: string): Promise<boolean>;

    /**
     * Evaluates a homomorphic operation on the given data file and additional parameters.
     * This method accepts a data file path and other optional parameters to perform the homomorphic evaluation.
     *
     * @param data_file - The path to the input data file used for evaluation.
     * @param others - Additional optional parameters, which could be other data files or configuration options for the evaluation.
     * @returns {boolean} - Returns true if the evaluation was successful; otherwise, returns false.
     */
    abstract evaluate(data_file: string, ...others: string[]): Promise<boolean>;

    /**
     * Decrypts the given encrypted data file.
     * This method accepts an encrypted data file path and decrypts the data contained in the file.
     *
     * @param data_file - The path to the encrypted data file to be decrypted.
     * @returns {boolean} - Returns true if the decryption was successful; otherwise, returns false.
     */
    abstract decrypt(data_file: string): Promise<boolean>;

    /**
     * Compiles the given function string into executable code for homomorphic encryption.
     * This method accepts a function string and compiles it into a form that can be executed in a homomorphic encryption environment.
     *
     * @param func_str - A string representing the function to be compiled. This string describes the homomorphic operation to be performed.
     * @returns {boolean} - Returns true if the compilation was successful; otherwise, returns false.
     */
    abstract compile(func_str: string): Promise<boolean>;
}