const CreateLeaveRequest = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px]">
        <h2 className="text-center text-lg font-semibold mb-4">
          CREATE A LEAVE REQUEST
        </h2>
        <hr className="mb-4" />

        <form className="space-y-4">
          {/* Type of leave */}
          <div>
            <label className="block font-medium">Type of leave</label>
            <select className="w-full p-2 border rounded mt-1">
              <option>Emergency leave</option>
              <option>Sick leave</option>
              <option>Annual leave</option>
            </select>
          </div>

          {/* Phone number */}
          <div>
            <label className="block font-medium">Phone number</label>
            <input type="text" className="w-full p-2 border rounded mt-1" />
          </div>

          {/* Start and End date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Start date of leave</label>
              <input type="date" className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="block font-medium">End date of leave</label>
              <input type="date" className="w-full p-2 border rounded mt-1" />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium">Reason</label>
            <input type="text" className="w-full p-2 border rounded mt-1" />
          </div>

          {/* Proof Upload */}
          <div>
            <label className="block font-medium">Proof</label>
            <input type="file" className="w-full border p-2 rounded mt-1" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeaveRequest;
